// const express = require('express');
// const bodyParser = require("body-parser");
// const router = express.Router();
// const mongoose = require("mongoose");
// const session = require("express-session");
// const passport = require("passport");
// const passportLocalMongoose = require("passport-local-mongoose");
// const uniqueValidator = require('mongoose-unique-validator');
// const userSchema = require("../schemas/Users");
//
//
// // const app = express();
//
// // app.use(bodyParser.urlencoded({extended: true}));
// //
// // app.use(session({
// //   secret: "secret",
// //   resave: false,
// //   saveUninitialized: false
// // }));
// //
// // app.use(passport.initialize());
// // app.use(passport.session());
// //
// // userSchema.plugin(passportLocalMongoose);
// // userSchema.plugin(uniqueValidator, {message: 'is already taken.'});
//
// const User = new mongoose.model("User", userSchema);
//
// // passport.use(User.createStrategy());
// // passport.serializeUser(User.serializeUser());
// // passport.deserializeUser(User.deserializeUser());
//
// /* GET users listing. */
// // router.get('/login', function(req, res, next) {
// //   const user = {
// //     id: '',
// //     email: '',
// //     fname: '',
// //     lname: '',
// //     budget: 0
// //   };
// //   console.log("This is GET method to /login.")
// //   console.log("Sending user template: ", user);
// //   res.json(user);
// // });
// //
// // router.get('/signup', function(req, res, next) {
// //   const user = {
// //     id: '',
// //     email: '',
// //     fname: '',
// //     lname: '',
// //     budget: 0
// //   };
// //   console.log("This is GET method to /signup.")
// //   console.log("Sending user template: ", user);
// //   res.json(user);
// // });
// //
// // router.post('/signup', function(req, res, next) {
// //   console.log("This is POST method to /signup.")
// //   console.log("This is what you have requested: ", req.body.newUser);
// //
// //   const newUser = new User({
// //     id: req.body.newUser.id,
// //     email: req.body.newUser.email,
// //     fname: req.body.newUser.fname,
// //     lname: req.body.newUser.lname,
// //     budget: req.body.newUser.budget,
// //     password: req.body.newUser.password
// //   });
// //
// //   newUser.save().then(savedUser => {
// //     console.log("This is the saved User: ", savedUser);
// //     res.json(savedUser);
// //   });
// // });
//
// // router.get('/login', function(req, res, next) {
// //   res.send('respond with a resource');
// // });
// //
// // router.get('/register', function(req, res, next) {
// //   res.send('respond with a resource');
// // });
// //
// // router.get("/dashboard", function(req, res, next){
// //   User.find({"secret": {$ne: null}}, function(err, foundUsers){
// //     if (err){
// //       console.log(err);
// //     } else {
// //       if (foundUsers) {
// //         res.send(foundUsers);
// //       }
// //     }
// //   });
// // });
// //
// // router.post('/login', function(req, res, next) {
// //   res.send('respond with a resource');
// // });
// //
// // router.post('/register', function(req, res, next) {
// //   res.send('respond with a resource');
// // });
//
// module.exports = router;

var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");
const userSchema = require("../schemas/Users");

const User = mongoose.model("User", userSchema);

router.get('/', function(req, res, next) {
  console.log("This is GET method to /users.");
  console.log("This is what you have requested: ", req.body);

  res.send(false);
});

router.post('/login', function(req, res, next) {
  console.log("This is POST method to /user/login");
  console.log("This is what you have requested: ", req.body);

  const returningFields = ['_id', 'fname', 'lname', 'email', 'budget', 'category_ids'];
  User.find({email: req.body.email, password: req.body.password}, returningFields, function(err, foundUser) {
    console.log("This is the found User: ", foundUser);
    // res.json(foundUser);
    if (foundUser.length !== 0) {
      res.json(foundUser);
    } else {
      // res.send(400, "Login Error: Incorrect Credentials");
      res.status(400).send("Login Error: Incorrect Credentials");
      // throw new Error("Login Error: Incorrect Credentials");
    }
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
    password: req.body.password,
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
        password: req.body.password,
      }
    },
    {returnOriginal:false}
).then(updatedUser => {
    console.log("This is the updated User: ", updatedUser);

    const returningFields = ['_id', 'fname', 'lname', 'email', 'budget', 'category_ids'];
    User.findById(updatedUser.id, returningFields, function(err, docs) {
      console.log("This is the updated User with specified fields: ", docs);
      res.json(docs);
    });
  });
});

module.exports = router;
