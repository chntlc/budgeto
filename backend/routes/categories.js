const express = require("express");
const router = express.Router();
const fs = require("fs");
const multer = require("multer");
const mongoose = require("mongoose");
const Categories = require("../schemas/Categories");
const userSchema = require("../schemas/Users");

const User = mongoose.model("User", userSchema);

router.get("/:user_id", async function (req, res, next) {
  const { user_id } = req.params;

  try {
    const user = await User.findOne({ _id: user_id });
    const user_category_ids = user ? user.category_ids : [];

    const categories = await Categories.find({
      _id: { $in: user_category_ids },
    });

    res.status(200);
    res.send(categories);
  } catch {
    res.status(400);
  }
});

const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "uploads");
  },
});

const fileFilter = function (req, file, cb) {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 16, // > 16MBs we should use GridFs
  },
  fileFilter,
});

router.post(
  "/addCategory",
  upload.single("icon_img"),
  async function (req, res, next) {
    const { name, color, user_id } = req.body;
    const icon_img_path = fs.readFileSync(req.file.path);
    const icon_img_extension = req.file.mimetype;
    const newCategory = new Categories({
      name,
      color,
      icon_img: {
        data: icon_img_path,
        contentType: icon_img_extension,
      },
    });

    try {
      const categoryAdded = await newCategory.save(newCategory);
      const categoryAddedId = categoryAdded._id;

      const user = await User.findOne({ _id: user_id });
      user.category_ids.push(categoryAddedId);
      user.save();

      console.log(categoryAdded);

      res.status(200);
      res.send(categoryAdded);
    } catch (err) {
      res.status(400);
      res.send({ err: err.message });
    }
  }
);

router.put(
  "/editCategory/:_id",
  upload.single("icon_img"),
  async function (req, res, next) {
    const category_id = req.params;
    const { name, color } = req.body;
    const icon_img_path = req.file ? fs.readFileSync(req.file.path) : null;
    const icon_img_extension = req.file ? req.file.mimetype : null;
    const update_payload = req.file
      ? {
          name,
          color,
          icon_img: {
            data: icon_img_path,
            contentType: icon_img_extension,
          },
        }
      : {
          name,
          color,
        };

    try {
      const editedCategory = await Categories.findOneAndUpdate(
        { _id: category_id },
        update_payload,
        {
          new: true,
          useFindAndModify: false,
        }
      );

      console.log(editedCategory);

      res.status(200);
      res.send(editedCategory);
    } catch (err) {
      res.status(400);
      res.send({ error: err.message });
    }
  }
);

router.delete(
  "/deleteCategory/:user_id/:category_id",
  async function (req, res, next) {
    const { user_id, category_id } = req.params;

    try {
      await Categories.deleteOne({ _id: category_id });

      const user = await User.findOne({ _id: user_id });
      const categoryToDeleteIndex = user.category_ids.indexOf(category_id);
      if (categoryToDeleteIndex > -1)
        user.category_ids.splice(categoryToDeleteIndex, 1);
      user.save();

      res.status(200);
      res.send(category_id);
    } catch (err) {
      res.status(400);
      res.send({ err: err.message });
    }
  }
);

module.exports = router;
