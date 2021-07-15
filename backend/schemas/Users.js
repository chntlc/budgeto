const mongoose = require("mongoose");
let validator = require("validator");

const userSchema = new mongoose.Schema({
  fname: String,
  lname: String,
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: [true, "can't be blank"],
    validate: (value) => {
      return validator.isEmail(value);
    },
  },
  budget: Number,
  password: {
    type: String,
    required: [true, "can't be blank"],
  },
  category_ids: [String],
}, {
  versionKey: false
});

// const userSchema = mongoose.Schema({
//   id: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   fname: String,
//   lname: String,
//   email: {
//     type: String,
//     lowercase: true,
//     unique: true,
//     required: [true, "can't be blank"],
//     validate: (value) => {
//       return validator.isEmail(value);
//     },
//   },
//   budget: Number,
//   password: {
//     type: String,
//     required: true,
//   },
//   category_ids: [String],
// });

// module.exports = mongoose.model("User", schema);
module.exports = userSchema;
