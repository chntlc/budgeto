const mongoose = require("mongoose");

const schema = mongoose.Schema({
  id: String,
  name: String,
  color: {
    type: String,
    default: "#FFFFFF",
    validate: (value) => {
      return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value);
    },
  },
  icon_img: { data: Buffer, contentType: String },
});

module.exports = mongoose.model("Category", schema);
