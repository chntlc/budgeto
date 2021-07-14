var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");
const userSchema = require("../schemas/Users");

const User = new mongoose.model("User", userSchema);

/* GET home page. */
router.get('/', function(req, res, next) {
  const user = {
    id: '',
    email: '',
    fname: '',
    lname: '',
    budget: 0
  };
  console.log("This is GET method to /settings.")
  console.log("Sending user template: ", user);
  res.json(user);
});

module.exports = router;
