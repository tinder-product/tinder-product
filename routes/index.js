const express = require('express')
const router = express.Router()
const Product = require("../models/Product")
const Match = require("../models/Match")

router.get('/', (req, res, next) => {
  Product.find({})
    .then(product => {
      if (req.user) {
        Match.find({ 'product_user': req.user._id })
          .then( matches => {
            console.log(req.user)
            res.render('index', {
              products: product,
              subtitle: 'Products',
              loggedUser: req.user,
              notifications: matches
            })
          }).catch(err => next(err))
      } else {
        res.render('index', {
          products: product,
          subtitle: 'Products'
        })
      }
    })
    .catch(err => next(err))
})


router.post('/', (req, res, next) => {
  const re = new RegExp(req.body.search, 'i')
  Product.find({
      "description": {
        $regex: re,
        $options: 'i'
      }
    })
    .then(response => {
      res.render('index', {
        products: response,
        subtitle: 'Products',
        loggedUser: req.user
      })
    }).catch(err => next(err))

})


router.post('/db', (req, res, next) => {

  new Match({
    user_id: req.user._id,
    user_name: req.user.username,
    product_id: req.body.productId,
    product_user: req.body.productUser,
    product_user_name: req.body.productUserName,
  }).save().then(response => {
    // console.log(response)
  })
})

module.exports = router
