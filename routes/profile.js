const path = require('path')
const passport = require('passport')
const router = require('express').Router()
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login')
const User = require("../models/User")
const Product = require("../models/Product")
const PATHS = require("./paths")
const multer = require('multer')
const destination= path.join(__dirname, "../public/avatar")
const upload = multer({dest : destination})



router.get('/profile/:id', (req, res, next) => {
  const userId = req.params.id
  User.findById(userId)
  .then( user => {
    Product.find({'user_id':userId})
    .then( response => {
      res.render('profile/dasboard',{subtitle:'List of products',userOwner: user, products: response})
    }) })
  .catch( err => next(err) )
})

router.get('/profile/:id/edit', ensureLoggedIn(), (req, res, next) => {
  const userId = req.params.id
  User.findById(userId)
  .then( response => res.render('profile/user_edit', { titleE:'Edit profile', userOwner: response } ) )
  .catch( err => next(err) )
})

router.post('/profile/:id/edit', ensureLoggedIn(), upload.single('avatar'), (req, res, next) => {
  const userId = req.params.id
  const updates = {
    lat: req.body.lat,
    lon: req.body.lon,
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
})

module.exports = router
