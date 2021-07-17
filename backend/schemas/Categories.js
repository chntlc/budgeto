const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    name: String,
    color: {
      type: String,
      default: "#FFFFFF",
      validate: (value) => {
        return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value);
      },
    },
    icon_img: { data: Buffer, contentType: String },
  },
  {
    collection: "categories",
  }
);

module.exports = mongoose.model("Categories", schema);
