const express = require('express');
const router  = express.Router();
const Product = require("../models/Product")

/* GET home page. */
router.get('/', (req, res, next) => {
  Product.find({})
  .then( response => {
    res.render('index', {products: response, title2: 'Lista de productos',  loggedUser:req.user})

  })
  .catch( err => next(err) )

});

module.exports = router;
