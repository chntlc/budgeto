const mongoose = require("mongoose");
let validator = require("validator");

const accountSchema = new mongoose.Schema({
  fname: String,
  lname: String,
  username: {
    type: String,
    lowercase: true,
    unique: true,
    required: [true, "can't be blank"],
    validate: (value) => {
      return validator.isEmail(value);
    },
  },
  budget: Number,
  password: String,
  category_ids: [String],
}, {
  versionKey: false
});

module.exports = accountSchema;
