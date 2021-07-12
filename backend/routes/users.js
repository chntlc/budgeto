const express = require('express');
const bodyParser = require("body-parser");
const router = express.Router();
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const userSchema = require("../schemas/Users");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
  secret: "secret",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

userSchema.plugin(passportLocalMongoose);

const User = new mongoose.model("User", userSchema);

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

/* GET users listing. */
router.get('/login', function(req, res, next) {
  res.send('respond with a resource');
});

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
