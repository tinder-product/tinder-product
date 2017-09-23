const Product = require("../models/Product")
const Match = require("../models/Match")


module.exports = {
  indexGet: (req, res, next) => {
    Product.find({})
    .then(product => {
      res.render('index', {products: product, subtitle: 'Products' })
    }).catch(err => next(err))
  },

  indexPost: (req, res, next) => {
    const re = new RegExp(req.body.search, 'i')
    Product.find({ "description": { $regex: re, $options: 'i' } })
    .then(response => { res.render('index', {products: response, subtitle: 'Products'  }) })
    .catch(err => next(err))
  },

  matchPost: (req, res, next) => {
    new Match({
      user_id: req.user._id,
      user_name: req.user.username,
      product_id: req.body.productId,
      product_user_id: req.body.productUser,
      product_user_name: req.body.productUserName,
    }).save().then(response => {
      // console.log(response)
    })
  },

  notificationsGet: (req, res, next) => {
    Match.find({ 'product_user_id': req.user._id })
    .then( matches => {res.render('notifications', { subtitle: 'Notifications', notifications: matches}) })
    .catch(err => next(err))
  },

  notificationsPost: (req, res, next) => {
    console.log(req.body.productId, req.body.userName)
    const updates = {
      match:true
    }

    Match.findOneAndUpdate({ 'user_name': req.body.userName, 'product_id': req.body.productId}, updates)
    .then( matches => { res.redirect('/notifications') })
    .catch( err => next(err))
  },


}