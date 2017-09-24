const express = require('express')
const router = express.Router()
const path = require('path')
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login')
const multer = require('multer')
const destination = path.join(__dirname, "../public/avatar/")
const upload = multer({dest : destination})
const productsController = require("../controllers/productsController")



router.get('/products/new', ensureLoggedIn(), productsController.newProductGet)

router.post('/products/new', upload.single('avatar'), productsController.newProductPost)

router.get('/products/:id', productsController.productGet)

router.get('/products/:id/edit', ensureLoggedIn(), productsController.editProductGet)

router.post('/products/:id/edit', upload.single('avatar'), productsController.editProductPost)

router.get('/products/:id/delete', ensureLoggedIn(), productsController.deleteProductGet)

module.exports = router
