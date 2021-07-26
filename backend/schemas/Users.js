const mongoose = require("mongoose");
const validator = require("validator");
const passportLocalMongoose = require("passport-local-mongoose")

const Session = new mongoose.Schema({
  refreshToken: {
    type: String,
    default: ""
  }
});

const userSchema = new mongoose.Schema({
  fname: String,
  lname: String,
  budget: Number,
  category_ids: [String],
  refreshToken: {
    type: [Session]
  }
}, {
  versionKey: false
});

//Remove refreshToken from the response
userSchema.set("toJSON", {
  transform: function(doc, ret, options) {
    delete ret.refreshToken
    return ret
  }
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);

// const userSchema = new mongoose.Schema({
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
//     required: [true, "can't be blank"],
//   },
//   category_ids: [String],
// }, {
//   versionKey: false
// });

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
// module.exports = userSchema;
