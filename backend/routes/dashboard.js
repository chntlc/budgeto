const express = require('express');
const router = express.Router();

const Item = require('../schemas/Items');
const Category = require('../schemas/Categories');

/* GET most spent category for a specified week */
router.get('/category/:user_id', function (req, res, next) {
  const user_id = req.params.user_id;
  const startDate = req.query.startDate;
  const endDate = req.query.endDate;

  Item.aggregate([
    {
      "$match": {
        user_id: user_id,
        date: {
          $gte: new Date(startDate),
          $lt: new Date(endDate)
        }
      }
    },
    {
      "$group": {
        _id: '$category_id',
        total: {
          $sum: {
            $multiply: ['$price', '$qty']
          }
        }
      }
    },
    {
      "$sort": {
        total: -1
      }
    }
  ])
    .then((items) => {
      // sorted by -1 so highest value is always first in array
      const categoryId = items[0]._id;
      const total = parseFloat(items[0].total);

      Category.find({
        _id: categoryId
      })
        .select('name')
        .then((item) => {
          const mostSpent = {
            name: item[0].name,
            total
          }
          res.send(mostSpent);
        })
        .catch((err) => {
          console.log({ err });
          res.send(err);
        })
    })
    .catch((err) => {
      console.log({ err });
      res.send(err);
    });
});

/* GET amount spent for the week */
router.get('/budget/:user_id', function (req, res, next) {
  const user_id = req.params.user_id;
  const startDate = req.query.startDate;
  const endDate = req.query.endDate;

  Item.aggregate([
    {
      "$match": {
        user_id: user_id,
        date: {
          $gte: new Date(startDate),
          $lt: new Date(endDate)
        }
      }
    },
    {
      "$group": {
        _id: null,
        total: {
          $sum: {
            $multiply: ['$price', '$qty']
          }
        }
      }
    }
  ])
    .then((items) => {
      const spent = {
        spent: parseFloat(items[0].total)
      }
      res.send(spent);
    })
    .catch((err) => {
      console.log({ err });
      res.send(err);
    });
});

module.exports = router;
