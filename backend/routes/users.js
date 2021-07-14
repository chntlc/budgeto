const express = require('express');
const bodyParser = require("body-parser");
const router = express.Router();
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const uniqueValidator = require('mongoose-unique-validator');
const userSchema = require("../schemas/Users");


// const app = express();

// app.use(bodyParser.urlencoded({extended: true}));
//
// app.use(session({
//   secret: "secret",
//   resave: false,
//   saveUninitialized: false
// }));
//
// app.use(passport.initialize());
// app.use(passport.session());
//
// userSchema.plugin(passportLocalMongoose);
// userSchema.plugin(uniqueValidator, {message: 'is already taken.'});

const User = new mongoose.model("User", userSchema);

// passport.use(User.createStrategy());
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

/* GET users listing. */
// router.get('/login', function(req, res, next) {
//   const user = {
//     id: '',
//     email: '',
//     fname: '',
//     lname: '',
//     budget: 0
//   };
//   console.log("This is GET method to /login.")
//   console.log("Sending user template: ", user);
//   res.json(user);
// });
//
// router.get('/signup', function(req, res, next) {
//   const user = {
//     id: '',
//     email: '',
//     fname: '',
//     lname: '',
//     budget: 0
//   };
//   console.log("This is GET method to /signup.")
//   console.log("Sending user template: ", user);
//   res.json(user);
// });
//
// router.post('/signup', function(req, res, next) {
//   console.log("This is POST method to /signup.")
//   console.log("This is what you have requested: ", req.body.newUser);
//
//   const newUser = new User({
//     id: req.body.newUser.id,
//     email: req.body.newUser.email,
//     fname: req.body.newUser.fname,
//     lname: req.body.newUser.lname,
//     budget: req.body.newUser.budget,
//     password: req.body.newUser.password
//   });
//
//   newUser.save().then(savedUser => {
//     console.log("This is the saved User: ", savedUser);
//     res.json(savedUser);
//   });
// });

// router.get('/login', function(req, res, next) {
//   res.send('respond with a resource');
// });
//
// router.get('/register', function(req, res, next) {
//   res.send('respond with a resource');
// });
//
// router.get("/dashboard", function(req, res, next){
//   User.find({"secret": {$ne: null}}, function(err, foundUsers){
//     if (err){
//       console.log(err);
//     } else {
//       if (foundUsers) {
//         res.send(foundUsers);
//       }
//     }
//   });
// });
//
// router.post('/login', function(req, res, next) {
//   res.send('respond with a resource');
// });
//
// router.post('/register', function(req, res, next) {
//   res.send('respond with a resource');
// });






module.exports = router;
