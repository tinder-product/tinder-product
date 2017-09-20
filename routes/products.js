const express = require('express')
const router = express.Router()
const Product = require('../models/Product')
// const User = require('../models/User')
const path = require('path')
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login')
const multer = require('multer')
const destination = path.join(__dirname, "../public/avatar/")
const upload = multer({dest : destination})


router.get('/products/new', ensureLoggedIn(), (req, res, next) => {
  res.render('products/new',{subtitle:'Add a product'})
})

router.post('/products/new', upload.single('avatar'), (req,res,next) =>{
  const productInfo = {
      name: req.body.name,
      user_id: req.user._id,
      description: req.body.description,
      user_name: req.user.username,
      avatar: `/avatar/${req.file.filename}`,
  }
  const newProduct = new Product(productInfo)
  newProduct.save()
  .then( response => { res.redirect(`/profile/${req.user._id}`) })
  .catch( err => next(err) )
})

router.get('/products/:id', (req, res, next) => {
  const productId = req.params.id
  Product.findById(productId)
  .then( response => { res.render('products/details',{product: response}) })
  .catch( err => next(err) )
})

router.get('/products/:id/edit', ensureLoggedIn(), (req, res, next) => {
  const productId = req.params.id
    Product.findById(productId)
    .then( response => {
      if( response.user_id != req.user._id){
        return res.redirect('/')
      }
      return res.render('products/edit', { subtitle:'Edit product', product: response, productId })
    })
    .catch( err => next(err))
})

router.post('/products/:id/edit', upload.single('avatar'), (req, res, next) => {
  const productId = req.params.id

  const updates = {
        name: req.body.name,
        description: req.body.description,
        avatar: `/avatar/${req.file.filename}`
  }
  Product.findByIdAndUpdate(productId, updates)
  .then( response => { res.redirect(`/products/${productId}`) })
  .catch( err => next(err) )
})

router.get('/products/:id/delete', ensureLoggedIn(), (req, res, next) => {
  const productId = req.params.id
  if( req.params.user_id == req.user._id){
    Product.findByIdAndRemove(productId)
    .then( response => res.redirect(`/profile/${req.user._id}`))
    .catch( err => next(err))
  }else{
    return res.redirect('/')
  }

})

module.exports = router
