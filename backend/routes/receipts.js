const express = require('express');
const router = express.Router();

const Items = require('../schemas/Items');
const Receipt = require('../schemas/Receipts');

router.post("/receipt", function (req, res, next) {
  const { receipt } = req.body;

  Receipt.insert(receipt)
    .then((receipt) => {
      res.send(receipt);
    })
    .catch(err => {
      console.log({ err });
      res.send(err);
    })
})

router.post("/items", function (req, res, next) {
  const { items } = req.body;

  Items.insertMany(items)
    .then((items) => {
      res.send(items);
    })
    .catch(err => {
      console.log({ err });
      res.send(err);
    })
})

module.exports = router;
