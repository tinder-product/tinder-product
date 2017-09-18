const express = require('express')
const router = express.Router()
const Product = require('../models/Product')
const path       = require('path')
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login')
const multer     = require('multer')
const destination= path.join(__dirname, "../public/avatar/")
const upload     = multer({dest : destination})

router.get('/products', ensureLoggedIn(), (req, res, next) => {
  const user = req.params
  Product.find({})
  .then( response => {
    res.render('products/index', {title:'Lista de productos',products: response, user:user})
  })
  .catch( err => next(err) )
})

// CREATE
router.get('/products/new', ensureLoggedIn(), (req, res, next) => {
  res.render('products/new',{title:'Add a product'})
})

router.post('/products/new', upload.single('avatar'), (req,res,next) =>{

  const productInfo = {
      name: req.body.name,
      description: req.body.description,
      avatar: `/avatar/${req.file.filename}`,
  }

  const newProduct = new Product(productInfo)
  newProduct.save()
  .then( response => { res.redirect('/products') })
  .catch( err => next(err) )
})

// RETRIEVE
router.get('/products/:id', (req, res, next) => {
  const productId = req.params.id

  Product.findById(productId)
  .then( response => {
    res.render('products/details',{title: 'Detalle', product: response})
  })
  .catch( err => next(err) )

})


// UPDATE
router.get('/products/:id/edit', (req, res, next) => {
  const productId = req.params.id
  Product.findById(productId)
  .then( response => {
    res.render('products/edit', { title:'Modify form', product: response, productId })
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
  Product.findByIdAndUpdate(productId, updates, (err, product) => {
    if (err){ return next(err) }
    return res.redirect(`/products/${productId}`)
  })
})

// DELETE
router.get('/products/:id/delete', (req, res, next) => {
  const productId = req.params.id
  Product.findByIdAndRemove(productId)
  .then( response => res.redirect('/products'))
  .catch( err => next(err))
})

module.exports = router
