var moment = require("moment");
var express = require("express");
var router = express.Router();
const Item = require("../schemas/Items");
const Category = require("../schemas/Categories");

// create a map later & data updated flag

// get data for calendar cells
router.get("/piedata/:id", async (req, res) => {
  const dayStart = moment(req.query.periodStart).toDate();
  const dayEnd = moment(req.query.periodEnd).endOf("day").toDate();
  await Item.aggregate([
    {
      $match: {
        user_id: req.params.id,
        date: { $gte: dayStart, $lte: dayEnd },
      },
    },
    {
      $group: {
        _id: "$category_id",
        total: {
          $sum: { $multiply: ["$price", "$qty"] },
        },
      },
    },
  ])
    .then((data) => {
      let result = {
        data: [],
        label: [],
        color: [],
      };
      const requests = data.map(async (item) => {
        await Category.findById(item._id).then((category) => {
          result.data.push(item.total);
          result.label.push(category.name);
          result.color.push(`${category.color}80`);
        });
      });
      Promise.all(requests).then(() => {
        res.send(result);
      });
    })
    .catch((err) => {
      res.send(err);
    });
});

router.get("/linedata/:id", async (req, res) => {
  const dates = getDaysArray(req.query.periodStart, req.query.periodEnd);
  const dayStart = moment(req.query.periodStart).toDate();
  const dayEnd = moment(req.query.periodEnd).endOf("day").toDate();
  await Item.aggregate([
    {
      $match: {
        user_id: req.params.id,
        date: { $gte: dayStart, $lte: dayEnd },
      },
    },
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
        total: {
          $sum: { $multiply: ["$price", "$qty"] },
        },
      },
    },
    {
      $sort: {
        _id: 1,
      },
    },
  ])
    .then((data) => {
      const result = {
        data: data,
        label: dates,
      };

      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
});

var getDaysArray = function (start, end) {
  var arr = [];
  for (
    let dt = new Date(start);
    dt <= new Date(end);
    dt.setDate(dt.getDate() + 1)
  ) {
    arr.push(new Date(dt).toISOString().slice(0, 10));
  }
  return arr;
};

module.exports = router;
