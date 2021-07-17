const express = require('express');
const router = express.Router();

const Item = require('../schemas/Items');
const Category = require('../schemas/Categories');

// TODO: build out query, test

/* GET most spent category for a specified week */
router.get('/category/:user_id', function (req, res, next) {
  console.log({ params: req.params }, { query: req.query });
  const user_id = req.params.user_id;
  const startDate = req.query.startDate;
  const endDate = req.query.endDate;

  // look at user collection, find all category_ids for user
  // look in item collection, find all items entered for specified date range, group items by category_id
  // for each item, sum up price * quantitiy
  // get total sum per category
  // get highest total sum
  // look in category collection for category name, given category_id

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
      console.log({ items });
      // sorted by -1 so highest value is always first in array
      const categoryId = items[0]._id;
      const total = parseFloat(items[0].total);

      console.log({ categoryId });

      Category.find({
        _id: categoryId
      })
        .select('name')
        .then((item) => {
          console.log({ item })
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
  console.log({ params: req.params }, { query: req.query });
  const user_id = req.params.user_id;
  const startDate = req.query.startDate;
  const endDate = req.query.endDate;

  // look in item collection, find all items entered for specified date range
  // for each item, sum up price * quantitiy
  // return total amount spent for period
  // res.send('respond with amount spent for week');
  // gets total amount items, price spend for user_id -- can put NULL cuz redundant
  // already used user_id in MATCH

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
      console.log({ items });
      const total = {
        total: parseFloat(items[0].total)
      }
      res.send(total);
    })
    .catch((err) => {
      console.log({ err });
      res.send(err);
    });
});

module.exports = router;
