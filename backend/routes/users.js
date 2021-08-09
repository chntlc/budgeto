const express = require("express");
const router = express.Router();
const fs = require("fs");
const multer = require("multer");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const path = require("path");
const User = require("../schemas/Users");
const {getToken, COOKIE_OPTIONS, getRefreshToken, verifyUser} = require("../strategies/authenticate");

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    var dirName = path.join(process.cwd(), "../profilePics/");
    console.log({ dirName });
    if (!fs.existsSync(dirName)) {
      fs.mkdirSync(dirName);
    }
    cb(null, dirName);
  },
});

var upload = multer({ storage: storage });

if (process.env.NODE_ENV !== "production") {
  // Load environment variables from .env file in non prod environments
  require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
}

router.get("/", function (req, res, next) {
  res.send(false);
});

router.get("/me", verifyUser, (req, res, next) => {
  res.send(req.user);
});

router.get("/logout", verifyUser, (req, res, next) => {
  const { signedCookies = {} } = req;
  const { refreshToken } = signedCookies;
  User.findById(req.user._id).then(
    (user) => {
      const tokenIndex = user.refreshToken.findIndex(
        (item) => item.refreshToken === refreshToken
      );
      if (tokenIndex !== -1) {
        user.refreshToken.id(user.refreshToken[tokenIndex]._id).remove();
      }
      user.save((err, user) => {
        if (err) {
          res.statusCode = 500;
          res.send(err);
        } else {
          res.clearCookie("refreshToken", COOKIE_OPTIONS);
          res.send({ success: true });
        }
      });
    },
    (err) => next(err)
  );
});

router.post("/login", passport.authenticate("local"), (req, res, next) => {
  const token = getToken({ _id: req.user._id });
  const refreshToken = getRefreshToken({ _id: req.user._id });

  User.findById(req.user._id).then(
    (user) => {
      user.refreshToken.push({ refreshToken });
      user.save((err, user) => {
        if (err) {
          console.log(
            "Something went wrong during user.save in /users/login POST METHOD"
          );
          res.statusCode = 500;
          res.send(err);
        } else {
          res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);
          const loggedInUser = {
            _id: user._id,
            username: user.username,
            fname: user.fname,
            lname: user.lname,
            budget: user.budget,
            category_ids: user.category_ids,
            profileImg: user.profileImg,
          };
          res.send({ success: true, loggedInUser, token });
        }
      });
    },
    (err) => next(err)
  );
});

router.post("/signup", (req, res, next) => {
  User.register(
    new User({ username: req.body.username }),
    req.body.password,
    (err, user) => {
      if (err) {
        console.log(
          "Something went wrong during User.register in /users/signup POST METHOD",
          err
        );
        res.statusCode = 500;
        res.send(err);
      } else {
        user.fname = req.body.fname;
        user.lname = req.body.lname;
        user.budget = req.body.budget;
        user.category_ids = req.body.category_ids;
        user.profileImg = "";

        const token = getToken({ _id: user._id });
        const refreshToken = getRefreshToken({ _id: user._id });
        user.refreshToken.push({ refreshToken });
        user.save((err, user) => {
          if (err) {
            console.log(
              "Something went wrong during user.save in /users/signup POST METHOD"
            );
            res.statusCode = 500;
            res.send(err);
          } else {
            res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);
            const signedUser = {
              _id: user._id,
              username: user.username,
              fname: user.fname,
              lname: user.lname,
              budget: user.budget,
              category_ids: user.category_ids,
              profileImg: user.profileImg,
            };
            res.send({ success: true, signedUser, token });
          }
        });
      }
    }
  );
});

router.post("/refreshToken", (req, res, next) => {
  const { signedCookies = {} } = req;
  const { refreshToken } = signedCookies;
  if (refreshToken) {
    try {
      const payload = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET
      );
      const userId = payload._id;
      User.findOne({ _id: userId }).then(
        (user) => {
          if (user) {
            // Find the refresh token against the user record in database
            const tokenIndex = user.refreshToken.findIndex(
              (item) => item.refreshToken === refreshToken
            );
            if (tokenIndex === -1) {
              res.send("Unauthorized");
            } else {
              const token = getToken({ _id: userId });
              // If the refresh token exists, then create new one and replace it.
              const newRefreshToken = getRefreshToken({ _id: userId });
              user.refreshToken[tokenIndex] = { refreshToken: newRefreshToken };
              user.save((err, user) => {
                if (err) {
                  res.statusCode = 500;
                  res.send(err);
                } else {
                  res.cookie("refreshToken", newRefreshToken, COOKIE_OPTIONS);
                  const refreshedUser = {
                    _id: user._id,
                    username: user.username,
                    fname: user.fname,
                    lname: user.lname,
                    budget: user.budget,
                    category_ids: user.category_ids,
                    profileImg: user.profileImg,
                  };
                  res.send({ success: true, refreshedUser, token });
                }
              });
            }
          } else {
            res.send("Unauthorized");
          }
        },
        (err) => next(err)
      );
    } catch (err) {
      res.send("Unauthorized");
    }
  } else {
    res.send("Unauthorized");
  }
});

router.patch("/settings", upload.single("profileImg"), function (req, res, next) {
    let profileImg = "";

    if (req.file) {
      const icon_img_buffer = fs.readFileSync(req.file.path);
      const icon_img_type = req.file.mimetype;
      let binary = icon_img_buffer.toString("base64");
      profileImg = `data:${icon_img_type};base64,${binary}`;
    }

    User.findById(req.body._id)
      .then((user) => {
        if (req.body.username) user.username = req.body.username;
        if (req.body.fname) user.fname = req.body.fname;
        if (req.body.lname) user.lname = req.body.lname;
        if (req.body.budget) user.budget = req.body.budget;
        if (req.file) user.profileImg = profileImg;

        user.save((err, user) => {
          if (err) {
            console.log(
              "Something went wrong during user.save in /users/settings POST METHOD"
            );
            res.statusCode = 500;
            res.send(err);
          } else {
            const updatedUser = {
              _id: user._id,
              username: user.username,
              fname: user.fname,
              lname: user.lname,
              budget: user.budget,
              category_ids: user.category_ids,
              profileImg: user.profileImg,
            };
            res.send({ success: true, updatedUser });
          }
        });
      },
      (err) => next(err)
    );
  }
);

module.exports = router;
