const mongoose = require("mongoose");
let validator = require("validator");

const schema = mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    lowercase: true,
    validate: (value) => {
      return validator.isEmail(value);
    },
  },
  fname: String,
  lname: String,
  budget: Number,
  password: {
    type: String,
    required: true,
  },
  category_ids: [String],
});

module.exports = mongoose.model("User", schema);
