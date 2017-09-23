const User = require('../models/User')
const Product = require("../models/Product")
const Match = require("../models/Match")
const multer = require('multer')
const path = require('path')
const destination = path.join(__dirname, "../public/avatar/")
const upload = multer({dest : destination})


module.exports = {
  profileGet: (req, res, next) => {
    const userId = req.params.id
    User.findById(userId)
    .then( user => {
      Product.find({'user_id':userId})
      .then( response => {
        Match.find({ 'product_user_id': req.user._id, 'user_id': userId})
        .then(matches => {
          return res.render('profile/dasboard',{subtitle:'List of products',userOwner: user, products: response, notifications:matches})
        })
      })
    })
    .catch( err => next(err) )
  },

  editProfileGet: (req, res, next) => {
    const userId = req.params.id
    User.findById(userId)
    .then( response => res.render('profile/user_edit', { titleE:'Edit profile', userOwner: response } ) )
    .catch( err => next(err) )
  },

  editProfilePost: (req, res, next) => {
    const userId = req.params.id
    const updates = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      username: req.body.username,
      email: req.body.email,
      phone: req.body.phone,
      avatar: `/avatar/${req.file.filename}`
    }
    User.findByIdAndUpdate(userId, updates)
    .then( response => res.redirect(`/profile/${userId}`))
    .catch( err => next(err))
  }

}
