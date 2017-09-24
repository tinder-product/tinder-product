const express        = require('express')
const path           = require('path')
const expressLayouts = require("express-ejs-layouts")
const logger         = require('morgan')
const cookieParser   = require('cookie-parser')
const bodyParser     = require('body-parser')
const mongoose       = require('mongoose')
const Match = require("../models/Match")
const flash = require("connect-flash");

module.exports = (app) => {

  app.set('views', path.join(__dirname, '../views'))
  app.set('view engine', 'ejs')
  app.set('layout', 'layouts/main-layout')
  app.use(expressLayouts)

  app.use(flash());
  
  app.use((req, res, next) =>{
    res.locals.title = "Change it!"
    res.locals.user = req.user
    if(req.user){
      Match.find({ 'product_user_id': req.user._id , 'match': false }).count()
        .then( matches => {
          res.locals.numMatches = matches
          next()
        })
    } else
      next()
  })

  app.use(logger('dev'))
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(cookieParser())
  app.use(express.static(path.join(__dirname, '../public')))

}
