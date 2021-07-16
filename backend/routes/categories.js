const express = require("express");
const router = express.Router();
const Categories = require("../schemas/Categories");

router.get("/:user_id", async function (req, res, next) {
  const { user_id } = req.params;

  try {
    const categories = await Categories.find();
    res.status(200);
    res.send(categories);
  } catch {
    res.status(400);
  }
});

router.post("/addCategory", async function (req, res, next) {
  console.log(req.body);
  const { name, color, icon_img } = req.body;
  const newCategory = new Categories({
    name,
    color,
    icon_img,
  });

  res.status(200);
  res.send(req.body);

  //   try {
  //     await newCategory.save(newCategory);
  //     res.status(200);
  //     res.send(newCategory);
  //   } catch {
  //     res.status(400);
  //     res.send({ error: "Cannot add the category" });
  //   }
});

router.put("/editCategory/:_id", async function (req, res, next) {
  const filter_id = req.params;
  const update = req.body;

  console.log(update);
  //   try {
  //     const edittedCategory = await Categories.findOneAndUpdate(
  //       filter_id,
  //       update,
  //       {
  //         returnOriginal: true,
  //       }
  //     );
  //     res.status(200);
  //     res.send(edittedCategory);
  //   } catch {
  //     res.status(400);
  //     res.send({ error: "Cannot edit the category" });
  //   }
});

router.delete("/deleteCategory/:_id", async function (req, res, next) {
  const filter_id = req.params;

  //   try {
  //     await Categories.deleteOne(filter_id);
  //     res.status(200);
  //     res.send(filter_id);
  //   } catch {
  //     res.status(400);
  //     res.send({ error: "Cannot delete the category" });
  //   }
});

module.exports = router;
