const mongoose = require("mongoose");

const schema = mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: String,
  price: Number,
  qty: Number,
  category_id: String,
  receipt_id: String,
  user_id: String,
  date: Date,
});

schema.set('toObject', { virtuals: true });

module.exports = mongoose.model("Item", schema);
