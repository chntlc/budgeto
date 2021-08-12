var moment = require("moment");
var express = require("express");
var router = express.Router();
const Item = require("../schemas/Items");

// get data for calendar cells
router.get("/dailyspend/:id/:date", async (req, res) => {
  let dayStart = moment(req.params.date);
  const dayEnd = dayStart.add(1, "days").toDate();
  dayStart = dayStart.subtract(1, "days").toDate();
  await Item.aggregate([
    {
      $match: {
        user_id: req.params.id,
        date: { $gte: dayStart, $lt: dayEnd },
      },
    },
    {
      $group: {
        _id: "$user_id",
        total: {
          $sum: { $multiply: ["$price", "$qty"] },
        },
      },
    },
  ])
    .then((item) => {
      const spending =
        item.length > 0 ? { dailyspend: item[0].total } : { dailyspend: 0 };

      res.send(spending);
    })
    .catch((err) => {
      res.send(err);
    });
});

router.get("/monthlyspend/:id/:date", async (req, res) => {
  let dayStart = moment(req.params.date);
  const dayEnd = dayStart.add(1, "months").toDate();
  dayStart = dayStart.subtract(1, "months").toDate();
  await Item.aggregate([
    {
      $match: {
        user_id: req.params.id,
        date: { $gte: dayStart, $lt: dayEnd },
      },
    },
    {
      $group: {
        _id: "$user_id",
        total: {
          $sum: { $multiply: ["$price", "$qty"] },
        },
      },
    },
  ])
    .then((item) => {
      const spending =
        item.length > 0 ? { monthlyspend: item[0].total } : { monthlyspend: 0 };

      res.send(spending);
    })
    .catch((err) => {
      res.send(err);
    });
});

module.exports = router;
