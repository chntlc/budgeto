const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const userSchema = require("../schemas/Users");
const bcrypt = require("bcrypt");

const saltRounds = 10;

// Level 2: Database Encryption
// const encrypt = require("mongoose-encryption");
// const secret = "Thisisourlittlesecret.";
// userSchema.plugin(encrypt, {secret: secret, encryptedFields: ["password"]});

// Level 3: Hashing Password
// const md5 = require("md5");
// Remember to wrap any password reference with md5();

// Level 4: Salting and Hashing
// const bcrypt = require("bcrypt");
// const saltRounds = 10;

const User = mongoose.model("User", userSchema);

router.get("/", function (req, res, next) {
  console.log("This is GET method to /users.");
  console.log("This is what you have requested: ", req.body);

  res.send(false);
});

router.post("/login", function (req, res, next) {
  console.log("This is POST method to /user/login");
  console.log("This is what you have requested: ", req.body);

  User.findOne({ email: req.body.email }, function (err, foundUser) {
    console.log("This is the found User: ", foundUser);
    if (foundUser) {
      bcrypt.compare(
        req.body.password,
        foundUser.password,
        function (err, result) {
          if (result === true) {
            const filteredUser = {
              _id: foundUser._id,
              fname: foundUser.fname,
              lname: foundUser.lname,
              email: foundUser.email,
              budget: foundUser.budget,
            };
            res.json(filteredUser);
          } else {
            res.status(400).send("Incorrect user credential provided!");
          }
        }
      );
    }
  }).catch((err) => {
    console.log(err);
    res.status(400).send("Bad Requests!");
  });
});

router.post("/signup", function (req, res, next) {
  console.log("This is POST method to /users/signup");
  console.log("This is what you have requested: ", req.body);

  bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
    const newUser = new User({
      email: req.body.email,
      fname: req.body.fname,
      lname: req.body.lname,
      budget: req.body.budget,
      password: hash,
      category_ids: [
        "60f290e8ce75a0e1c42e404c",
        "60f2afba040b34ebc74be130",
        "60f2b0fed9e4daec224be7aa",
        "60f2cbd65e51f2f481a0698f",
        "60f2cbd65e51f2f481a0698f",
      ],
    });

    console.log("This is the newUser to be saved: ", newUser);

    newUser
      .save()
      .then((savedUser) => {
        console.log("This is the saved User: ", savedUser);

        const returningFields = [
          "_id",
          "fname",
          "lname",
          "email",
          "budget",
          "category_ids",
        ];
        User.findById(savedUser.id, returningFields, function (err, docs) {
          console.log("This is the saved User with specified fields: ", docs);
          res.json(docs);
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).send("Bad Requests!");
        // res.redirect(400, "http://localhost:3000/");
      });
  });
});

router.patch("/settings", function (req, res, next) {
  const userToChange = req.body;
  console.log("This is PATCH method to /users/settings");
  console.log("This is what you have requested: ", userToChange);

  const findUpdateUser = (hash) => {
    // only update fields if they've changed
    const $set = {};
    if (req.body.email) $set.email = req.body.email;
    if (req.body.fname) $set.fname = req.body.fname;
    if (req.body.lname) $set.lname = req.body.lname;
    if (req.body.budget) $set.budget = req.body.budget;
    if (req.body.password) $set.password = hash;

    User.findOneAndUpdate(
      { _id: userToChange._id },
      {
        $set
      },
      {
        fields: { _id: 1, fname: 1, lname: 1, email: 1, budget: 1, category_ids: 1 },
        returnOriginal: false
      }
    ).then((updatedUser) => {
      console.log("This is the updated User: ", updatedUser);

      res.json(updatedUser);
    })
      .catch((err) => {
        console.log(err);
        res.status(400).send("Bad Requests!");
        // res.redirect(400, "http://localhost:3000/dashboard");
      });
  }

  if (req.body.password) {
    bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
      findUpdateUser(hash)
    });
  } else {
    findUpdateUser()
  }
});

module.exports = router;
