var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");
const config = require("../bin/config");
const userSchema = require("../schemas/Users");

mongoose.connect(
  `mongodb+srv://${config.mongoId}:${config.mongoPw}@budgeto.irn1u.mongodb.net/${config.mongoDb}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    }
  )

const User = mongoose.model("User", userSchema);

/* GET home page. */
router.get('/', function(req, res, next) {
  const user = {
    id: '',
    email: '',
    fname: '',
    lname: '',
    budget: 0
  };
  console.log("This is GET method to /signup.")
  console.log("Sending user template: ", user);
  res.json(user);
});

router.post('/', function(req, res, next) {
  console.log("This is POST method to /signup.")
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

  newUser.save().then(savedUser => {
    console.log("This is the saved User: ", savedUser);

    const returningFields = ['_id', 'fname', 'lname', 'email', 'budget', 'category_ids'];
    User.findById(savedUser.id, returningFields, function(err, docs) {
      console.log("This is the saved User with specified fields: ", docs);
      res.json(docs);
    });
  });
});

module.exports = router;
