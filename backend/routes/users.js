const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const userSchema = require("../schemas/Users");
const md5 = require("md5");

// Level 2: Database Encryption
// const encrypt = require("mongoose-encryption");
// const secret = "Thisisourlittlesecret.";
// userSchema.plugin(encrypt, {secret: secret, encryptedFields: ["password"]});

const User = mongoose.model("User", userSchema);

router.get('/', function(req, res, next) {
  console.log("This is GET method to /users.");
  console.log("This is what you have requested: ", req.body);

  res.send(false);
});

router.post('/login', function(req, res, next) {
  console.log("This is POST method to /user/login");
  console.log("This is what you have requested: ", req.body);

  // const returningFields = ['_id', 'fname', 'lname', 'email', 'budget', 'category_ids'];
  // User.find({email: req.body.email, password: req.body.password}, returningFields, function(err, foundUser) {
  //   console.log("This is the found User: ", foundUser);
  //   // res.json(foundUser);
  //   if (foundUser.length !== 0) {
  //     res.json(foundUser);
  //   } else {
  //     // res.send(400, "Login Error: Incorrect Credentials");
  //     // res.status(400).send("Login Error: Incorrect Credentials");
  //
  //     res.redirect(400, "http://localhost:3000/");
  //     // res.render("/");
  //   }
  // });

  User.findOne({email: req.body.email}, function(err, foundUser) {
    console.log("This is the found User: ", foundUser);
    if (foundUser && foundUser.password === md5(req.body.password)) {
      const filteredUser = {
        _id: foundUser._id,
        fname: foundUser.fname,
        lname: foundUser.lname,
        email: foundUser.email,
        budget: foundUser.budget
      }
      res.json(filteredUser);
    }
  })
  .catch(err => {
    console.log(err);
    // res.send(400, "Bad Requests!");
    res.status(400).send("Bad Requests!");
  });
});

router.post('/signup', function(req, res, next) {
  console.log("This is POST method to /users/signup");
  console.log("This is what you have requested: ", req.body);

  const newUser = new User({
    email: req.body.email,
    fname: req.body.fname,
    lname: req.body.lname,
    budget: req.body.budget,
    password: md5(req.body.password),
    category_ids: [
      "60ea83a2bc80e195b3f3f69f",
      "60ea84d1bc80e195b3f3f6a0",
      "60ea8510bc80e195b3f3f6a1",
      "60ea852abc80e195b3f3f6a2",
      "60ea8555bc80e195b3f3f6a3"
    ]
  });

  console.log("This is the newUser to be saved: ", newUser);

  newUser.save()
    .then(savedUser => {
      console.log("This is the saved User: ", savedUser);

      const returningFields = ['_id', 'fname', 'lname', 'email', 'budget', 'category_ids'];
      User.findById(savedUser.id, returningFields, function(err, docs) {
        console.log("This is the saved User with specified fields: ", docs);
        res.json(docs);
      });
    })
    .catch(err => {
      console.log(err);
      // res.send(400, "Bad Requests!");
      res.status(400).send("Bad Requests!");

      // res.redirect(400, "http://localhost:3000/");
      // res.render("/");
    });
});

router.patch("/settings", function(req, res, next) {
  const userToChange = req.body;
  console.log("This is PATCH method to /users/settings");
  console.log("This is what you have requested: ", userToChange);

  User.findOneAndUpdate(
    {_id: userToChange._id},
    {$set:
      {
        email: req.body.email,
        fname: req.body.fname,
        lname: req.body.lname,
        budget: req.body.budget,
        password: md5(req.body.password),
      }
    },
    {returnOriginal:false}
).then(updatedUser => {
    console.log("This is the updated User: ", updatedUser);

    const returningFields = ['_id', 'fname', 'lname', 'email', 'budget', 'category_ids'];
    User.findById(updatedUser.id, returningFields, function(err, docs) {
      console.log("This is the updated User with specified fields: ", docs);
      res.json(docs);
    })
    .catch(err => {
      console.log(err);
      // res.send(400, "Bad Requests!");
      res.status(400).send("Bad Requests!");

      // res.redirect(400, "http://localhost:3000/dashboard");
      // res.render("/");
    });
  });
});

module.exports = router;
