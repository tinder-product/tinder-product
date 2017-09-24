const express = require('express')
const router = express.Router()
const Product = require("../models/Product")
const Match = require("../models/Match")
const indexController = require("../controllers/indexController")


router.get('/', indexController.indexGet)

router.post('/', indexController.indexPost)

router.post('/db', indexController.matchPost)

router.get('/notifications', indexController.notificationsGet)

router.post('/notifications', indexController.notificationsPost)

router.get('/notifications/:id/delete', indexController.deleteNotificationsGet)


module.exports = router
