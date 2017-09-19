const express = require('express');
const router  = express.Router();
const Product = require("../models/Product")
// const User = require("../models/User")
const Match = require("../models/Match")

router.get('/', (req, res, next) => {
  Product.find({})
  .then( response => {
    res.render('index', {products: response, title: 'Tinder product',  loggedUser:req.user})
  }).catch( err => next(err) )

});

router.post('/db', (req, res, next) => {
  new Match({
    user_id: req.user._id,
    product_id: req.body.productId
  }).save().then( response => {
    console.log(response)
  })
});

module.exports = router;
