const express = require('express')
const router  = express.Router()
const Product = require("../models/Product")
const Match = require("../models/Match")

router.get('/', (req, res, next) => {
  Product.find({})
  .then( response => {
    res.render('index', {products: response, subtitle: 'Products',  loggedUser:req.user})
  }).catch( err => next(err) )

})

router.post('/', (req, res, next) => {
  const re = new RegExp(req.body.search, 'i')

  Product.find({ "description" : { $regex: re, $options: 'i' } } )
  .then( response => {
    res.render('index', {products: response, subtitle: 'Products',  loggedUser:req.user})
  }).catch( err => next(err) )
  
})


router.post('/db', (req, res, next) => {
  new Match({
    user_id: req.user._id,
    product_id: req.body.productId
  }).save().then( response => {
    console.log(response)
  })
})

module.exports = router
