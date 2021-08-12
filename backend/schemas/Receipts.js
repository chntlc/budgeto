const mongoose = require("mongoose");

const schema = mongoose.Schema({
  user_id: String,
  items: [String],
  store: String,
  date: Date,
});

module.exports = mongoose.model("Receipt", schema);
