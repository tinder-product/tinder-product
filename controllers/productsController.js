const Product = require('../models/Product')
const Match = require('../models/Match')
const multer = require('multer')
const path = require('path')
const destination = path.join(__dirname, "../public/avatar/")
const upload = multer({dest : destination})


module.exports = {
  newProductGet: (req, res, next) => {
    res.render('products/new',{subtitle:'Add a product'})
  },

  newProductPost: (req, res, next) => {
    const productInfo = {
        lat: req.body.lat,
        lon: req.body.lon,
        name: req.body.name,
        user_id: req.user._id,
        user_avatar: req.user.avatar,
        description: req.body.description,
        user_name: req.user.username,
        avatar: `/avatar/${req.file.filename}`,
    }
    const newProduct = new Product(productInfo)
    newProduct.save()
    .then( response => { res.redirect(`/profile/${req.user._id}`) })
    .catch( err => next(err) )
  },

  productGet: (req, res, next) => {
    const productId = req.params.id
    Product.findById(productId)
    .then( response => {
      Match.find({'product_id': productId})
      .then( matches => { return res.render('products/details',{product: response, notifications:matches})  })
    })
    .catch( err => next(err) )
  },

  editProductGet: (req, res, next) => {
    const productId = req.params.id
    Product.findById(productId)
    .then( response => {
      if( response.user_id != req.user._id){
        return res.redirect('/')
      }
      return res.render('products/edit', { subtitle:'Edit product', product: response, productId })
    })
    .catch( err => next(err))
  },

  editProductPost: (req, res, next) => {
    const productId = req.params.id

    const updates = {
      lat: req.body.lat,
      lon: req.body.lon,
      name: req.body.name,
      description: req.body.description,
      avatar: `/avatar/${req.file.filename}`
    }
    Product.findByIdAndUpdate(productId, updates)
    .then( response => { res.redirect(`/products/${productId}`) })
    .catch( err => next(err) )
  },

  deleteProductGet: (req, res, next) => {
    const productId = req.params.id
    Product.findByIdAndRemove(productId)
    .then( response => res.redirect(`/profile/${req.user._id}`))
    .catch( err => next(err))
  }

}
