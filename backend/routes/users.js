const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const path = require("path");
const User = require("../schemas/Users");
const { getToken, COOKIE_OPTIONS, getRefreshToken, verifyUser } = require("../strategies/authenticate");

if (process.env.NODE_ENV !== "production") {
  // Load environment variables from .env file in non prod environments
  require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
}

router.get("/", function (req, res, next) {
  console.log("This is GET method to /users.");
  console.log("This is what you have requested: ", req.body);

  res.send(false);
});

router.get("/me", verifyUser, (req, res, next) => {
  res.send(req.user);
});

router.get("/logout", verifyUser, (req, res, next) => {
  const { signedCookies = {} } = req
  const { refreshToken } = signedCookies
  User.findById(req.user._id).then(
    user => {
      const tokenIndex = user.refreshToken.findIndex(
        item => item.refreshToken === refreshToken
      )
      if (tokenIndex !== -1) {
        user.refreshToken.id(user.refreshToken[tokenIndex]._id).remove()
      }
      user.save((err, user) => {
        if (err) {
          res.statusCode = 500
          res.send(err)
        } else {
          res.clearCookie("refreshToken", COOKIE_OPTIONS)
          res.send({ success: true })
        }
      })
    },
    err => next(err)
  )
});

router.post("/login", passport.authenticate("local"), (req, res, next) => {
  console.log("This is the POST METHOD for /users/login");
  console.log("This is what you have requested: ", req.body);
  console.log("This is what you have requested: ", req.user);

  const token = getToken({ _id: req.user._id });
  const refreshToken = getRefreshToken({ _id: req.user._id });

  console.log("This is the value of token: ", token);
  console.log("This is the value of refreshToken: ", refreshToken);

  User.findById(req.user._id).then(
    user => {
      console.log("Found user during /users/login POST METHOD:", user);
      user.refreshToken.push({ refreshToken })
      user.save((err, user) => {
        if (err) {
          console.log("Something went wrong during user.save in /users/login POST METHOD");
          res.statusCode = 500;
          res.send(err);
        } else {
          res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);
          console.log("This is the logged in User: ", user);
          const loggedInUser = {
            _id: user._id,
            username: user.username,
            fname: user.fname,
            lname: user.lname,
            budget: user.budget,
            category_ids: user.category_ids
          }
          res.send({ success: true, loggedInUser, token });
        }
      })
    },
    err => next(err)
  );
})

router.post("/signup", (req, res, next) => {
  console.log("This is the POST METHOD for /users/signup");
  console.log("This is what you have requested: ", req.body);

  User.register(new User({ username: req.body.username }), req.body.password, (err, user) => {
    if (err) {
      console.log("Something went wrong during User.register in /users/signup POST METHOD");
      res.statusCode = 500;
      res.send(err);
    } else {
      user.fname = req.body.fname;
      user.lname = req.body.lname;
      user.budget = req.body.budget;
      user.category_ids = req.body.category_ids;
      const token = getToken({ _id: user._id });
      const refreshToken = getRefreshToken({ _id: user._id });
      user.refreshToken.push({ refreshToken });
      user.save((err, user) => {
        if (err) {
          console.log("Something went wrong during user.save in /users/signup POST METHOD");
          res.statusCode = 500;
          res.send(err);
        } else {
          res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);
          console.log("This is the signed up User: ", user);
          const signedUser = {
            _id: user._id,
            username: user.username,
            fname: user.fname,
            lname: user.lname,
            budget: user.budget,
            category_ids: user.category_ids
          }
          res.send({ success: true, signedUser, token });
        }
      })
    }
  });
})

router.post("/refreshToken", (req, res, next) => {
  const { signedCookies = {} } = req
  const { refreshToken } = signedCookies
  if (refreshToken) {
    try {
      const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
      const userId = payload._id
      User.findOne({ _id: userId }).then(
        user => {
          if (user) {
            // Find the refresh token against the user record in database
            const tokenIndex = user.refreshToken.findIndex(
              item => item.refreshToken === refreshToken
            )
            if (tokenIndex === -1) {
              res.statusCode = 401;
              res.send("Unauthorized");
            } else {
              const token = getToken({ _id: userId })
              // If the refresh token exists, then create new one and replace it.
              const newRefreshToken = getRefreshToken({ _id: userId })
              user.refreshToken[tokenIndex] = { refreshToken: newRefreshToken }
              user.save((err, user) => {
                if (err) {
                  res.statusCode = 500;
                  res.send(err);
                } else {
                  res.cookie("refreshToken", newRefreshToken, COOKIE_OPTIONS);
                  console.log("This is the User with refreshedToken: ", user);
                  const refreshedUser = {
                    _id: user._id,
                    username: user.username,
                    fname: user.fname,
                    lname: user.lname,
                    budget: user.budget,
                    category_ids: user.category_ids
                  }
                  res.send({ success: true, refreshedUser, token });
                  // res.send({ success: true, token });
                }
              })
            }
          } else {
            res.statusCode = 401;
            res.send("Unauthorized");
          }
        },
        err => next(err)
      )
    } catch (err) {
      res.statusCode = 401;
      res.send("Unauthorized");
    }
  } else {
    res.statusCode = 401;
    res.send("Unauthorized");
  }
})

router.patch("/settings", (req, res, next) => {
  console.log("This is the POST METHOD for /users/settings");
  console.log("This is what you have requested: ", req.body);

  User.findById(req.body._id).then(
    user => {
      console.log("Found user during /users/settings POST METHOD:", user);
      user.fname = req.body.fname;
      user.lname = req.body.lname;
      user.budget = req.body.budget;
      user.save((err, user) => {
        if (err) {
          console.log("Something went wrong during user.save in /users/settings POST METHOD");
          res.statusCode = 500;
          res.send(err);
        } else {
          console.log("This is the updated in User: ", user);
          const updatedUser = {
            _id: user._id,
            username: user.username,
            fname: user.fname,
            lname: user.lname,
            budget: user.budget,
            category_ids: user.category_ids
          }
          res.send({ success: true, updatedUser});
        }
      })
    },
    err => next(err)
  );
})

module.exports = router;
