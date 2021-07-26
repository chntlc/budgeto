const express = require("express");
const router = express.Router();
const User = require("../schemas/Users");
const { getToken, COOKIE_OPTIONS, getRefreshToken } = require("../strategies/authenticate");
// const mongoose = require("mongoose");
// const userSchema = require("../schemas/Users");
// const accountSchema = require("../schemas/Accounts");
// const session = require("express-session");
// const passport = require("passport");
// const passportLocalMongoose = require("passport-local-mongoose");

router.post("/signup", (req, res, next) => {
  console.log("This is the POST METHOD for /users/signup");
  // console.log("This is what you have requested: ", req);
  console.log("This is what you have requested: ", req.body);

  User.register(new User({ username: req.body.username }), req.body.password, (err, user) => {
    if (err) {
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
          res.statusCode = 500;
          res.send(err);
        } else {
          console.log("Got User token set up. Need to set up cookie on response");
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









// accountSchema.plugin(passportLocalMongoose);
//
// const Account = mongoose.model("Account", accountSchema);
//
// passport.use(Account.createStrategy());
// passport.serializeUser(Account.serializeUser());
// passport.deserializeUser(Account.deserializeUser());
//
// router.get("/", function (req, res, next) {
//   console.log("This is GET method to /users.");
//   console.log("This is what you have requested: ", req.body);
//
//   res.send(false);
// });
//
// router.post("/login", function (req, res, next) {
//   console.log("This is POST method to /user/login");
//   console.log("This is what you have requested: ", req.body);
//
//   const user = new Account({
//     username: req.body.username,
//     password: req.body.password
//   });
//
//   req.login(user, function(err) {
//     if (err) {
//       console.log("req.login is throwing error!");
//       console.log(err);
//     } else {
//       passport.authenticate("local")(req, res, function() {
//         console.log("User Login: Authenticated!")
//         const returningFields = [
//           "_id",
//           "fname",
//           "lname",
//           "username",
//           "budget",
//           "category_ids",
//         ];
//         Account.findOne({username: req.body.username}, returningFields, function (err, docs) {
//           console.log("This is the found User with specified fields: ", docs);
//           res.json(docs);
//         }).catch((err) => {
//           console.log(err);
//           res.status(400).send("Bad Requests!");
//         });
//       });
//     }
//   })
// });
//
// router.post("/signup", function (req, res, next) {
//   console.log("This is POST method to /users/signup");
//   console.log("This is what you have requested: ", req.body);
//
//   const username = req.body.username;
//   const password = req.body.password;
//
//   Account.register({username: username}, password, function(err, user) {
//     if (err) {
//       console.log(err);
//       res.redirect("/");
//     } else {
//       passport.authenticate("local")(req, res, function() {
//         Account.findOneAndUpdate({ username: username },
//           {
//             $set: {
//               fname: req.body.fname,
//               lname: req.body.lname,
//               budget: req.body.budget,
//               category_ids: req.body.category_ids
//             },
//           },
//           { returnOriginal: false }
//         ).then((updatedUser) => {
//           console.log("This is the updated User: ", updatedUser);
//
//           const returningFields = [
//             "_id",
//             "fname",
//             "lname",
//             "username",
//             "budget",
//             "category_ids",
//           ];
//           Account.findById(updatedUser.id, returningFields, function (err, docs) {
//             console.log("This is the updated User with specified fields: ", docs);
//             // res.json(docs);
//             res.redirect("/dashboard");
//           }).catch((err) => {
//             console.log(err);
//             res.status(400).send("Bad Requests!");
//           });
//         });
//       })
//     }
//   });
// });

// router.patch("/settings", function (req, res, next) {
//   const userToChange = req.body;
//   console.log("This is PATCH method to /users/settings");
//   console.log("This is what you have requested: ", userToChange);
//   bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
//     User.findOneAndUpdate(
//       { _id: userToChange._id },
//       {
//         $set: {
//           email: req.body.email,
//           fname: req.body.fname,
//           lname: req.body.lname,
//           budget: req.body.budget,
//           password: hash,
//         },
//       },
//       { returnOriginal: false }
//     ).then((updatedUser) => {
//       console.log("This is the updated User: ", updatedUser);
//
//       const returningFields = [
//         "_id",
//         "fname",
//         "lname",
//         "email",
//         "budget",
//         "category_ids",
//       ];
//       User.findById(updatedUser.id, returningFields, function (err, docs) {
//         console.log("This is the updated User with specified fields: ", docs);
//         res.json(docs);
//       }).catch((err) => {
//         console.log(err);
//         res.status(400).send("Bad Requests!");
//         // res.redirect(400, "http://localhost:3000/dashboard");
//       });
//     });
//   });
// });










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

// const User = mongoose.model("User", userSchema);

// router.get("/", function (req, res, next) {
//   console.log("This is GET method to /users.");
//   console.log("This is what you have requested: ", req.body);
//
//   res.send(false);
// });
//
// router.post("/login", function (req, res, next) {
//   console.log("This is POST method to /user/login");
//   console.log("This is what you have requested: ", req.body);
//
//   User.findOne({ email: req.body.email }, function (err, foundUser) {
//     console.log("This is the found User: ", foundUser);
//     if (foundUser) {
//       bcrypt.compare(
//         req.body.password,
//         foundUser.password,
//         function (err, result) {
//           if (result === true) {
//             const filteredUser = {
//               _id: foundUser._id,
//               fname: foundUser.fname,
//               lname: foundUser.lname,
//               email: foundUser.email,
//               budget: foundUser.budget,
//             };
//             res.json(filteredUser);
//           } else {
//             res.status(400).send("Incorrect user credential provided!");
//           }
//         }
//       );
//     }
//   }).catch((err) => {
//     console.log(err);
//     res.status(400).send("Bad Requests!");
//   });
// });
//
// router.post("/signup", function (req, res, next) {
//   console.log("This is POST method to /users/signup");
//   console.log("This is what you have requested: ", req.body);
//
//   bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
//     const newUser = new User({
//       email: req.body.email,
//       fname: req.body.fname,
//       lname: req.body.lname,
//       budget: req.body.budget,
//       password: hash,
//       category_ids: [
//         "60f290e8ce75a0e1c42e404c",
//         "60f2afba040b34ebc74be130",
//         "60f2b0fed9e4daec224be7aa",
//         "60f2cbd65e51f2f481a0698f",
//         "60f2cbd65e51f2f481a0698f",
//       ],
//     });
//
//     console.log("This is the newUser to be saved: ", newUser);
//
//     newUser
//       .save()
//       .then((savedUser) => {
//         console.log("This is the saved User: ", savedUser);
//
//         const returningFields = [
//           "_id",
//           "fname",
//           "lname",
//           "email",
//           "budget",
//           "category_ids",
//         ];
//         User.findById(savedUser.id, returningFields, function (err, docs) {
//           console.log("This is the saved User with specified fields: ", docs);
//           res.json(docs);
//         });
//       })
//       .catch((err) => {
//         console.log(err);
//         res.status(400).send("Bad Requests!");
//         // res.redirect(400, "http://localhost:3000/");
//       });
//   });
// });
//
// router.patch("/settings", function (req, res, next) {
//   const userToChange = req.body;
//   console.log("This is PATCH method to /users/settings");
//   console.log("This is what you have requested: ", userToChange);
//   bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
//     User.findOneAndUpdate(
//       { _id: userToChange._id },
//       {
//         $set: {
//           email: req.body.email,
//           fname: req.body.fname,
//           lname: req.body.lname,
//           budget: req.body.budget,
//           password: hash,
//         },
//       },
//       { returnOriginal: false }
//     ).then((updatedUser) => {
//       console.log("This is the updated User: ", updatedUser);
//
//       const returningFields = [
//         "_id",
//         "fname",
//         "lname",
//         "email",
//         "budget",
//         "category_ids",
//       ];
//       User.findById(updatedUser.id, returningFields, function (err, docs) {
//         console.log("This is the updated User with specified fields: ", docs);
//         res.json(docs);
//       }).catch((err) => {
//         console.log(err);
//         res.status(400).send("Bad Requests!");
//         // res.redirect(400, "http://localhost:3000/dashboard");
//       });
//     });
//   });
// });

module.exports = router;
