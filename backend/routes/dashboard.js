const express = require('express');
const router = express.Router();

const Item = require('../schemas/Items');

// TODO: build out query, test

/* GET most spent category for a specified week */
router.get('/dashboard/category/:user_id', function (req, res, next) {
  const user_id = req.params.user_id;
  // look at user collection, find all category_ids for user
  // look in item collection, find all items entered for specified date range, group items by category_id
  // for each item, sum up price * quantitiy
  // get total sum per category
  // get highest total sum
  // look in category collection for category name, given category_id

  // QUERY: 
  // db.items.aggregate([
  //   {
  //     $match: {
  //       user_id: '60ea858bbc80e195b3f3f6a4',
  //       date: {
  //         $gte: ISODate("2021-07-08T07:00:00Z"),
  //         $lt: ISODate("2021-07-12T07:00:00Z")
  //       }
  //     }
  //   },
  //   {
  //     $group: {
  //       _id: '$category_id',
  //       prices: {
  //         $sum: {
  //           $multiply: ['$price', '$qty']
  //         }
  //       }
  //     },
  //   }
  // ])
  res.send('respond with most spent category');
});

/* GET amount spent for the week */
router.get('/budget/:user_id', function (req, res, next) {
  console.log({ params: req.params }, { query: req.query })
  const user_id = req.params.user_id;
  // look in item collection, find all items entered for specified date range, group items by category_id
  Item.find()
    .then((items) => {
      console.log({ items });
      res.send(items);
    })
    .catch((err) => {
      console.log({ err })
    })

  // this is basically the query i need to do, but with dynamic fields i get
  // gets total amount items, price spend for user_id -- can put NULL cuz redundant
  // already used user_id in MATCH

  // db.items.aggregate([
  //   {
  //     $match: {
  //       user_id: '60ea858bbc80e195b3f3f6a4',
  //       date: {
  //         $gte: ISODate("2021-07-08T07:00:00Z"),
  //         $lt: ISODate("2021-07-12T07:00:00Z")
  //       }
  //     }
  //   },
  //   {
  //     $group: {
  //       _id: '$user_id',
  //       prices: {
  //         $sum: {
  //           $multiply: ['$price', '$qty']
  //         }
  //       }
  //     },
  //   }
  // ])

  Item.aggregate([{
    "$match": {
      user_id: user_id
    }
  },
  {
    "$group": {
      _id: 'category_id'
    }
  }
  ])
  // for each item, sum up price * quantitiy
  // return total amount spent for period
  // res.send('respond with amount spent for week');
});

module.exports = router;
