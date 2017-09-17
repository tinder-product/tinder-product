const express = require('express');
const path = require('path');
const expressLayouts = require("express-ejs-layouts");
const logger       = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');
const session = require('express-session');
const MongoStore = require("connect-mongo")(session);
const mongoose     = require('mongoose');
const passport = require("passport");
const flash = require("connect-flash");

module.exports = function (app){

  app.set('views', path.join(__dirname, '../views'));
  app.set('view engine', 'ejs');
  app.set('layout', 'layouts/main-layout');
  app.use(expressLayouts);

  app.use((req,res,next) =>{
    res.locals.title = "tinder-product";
    next();
  });

  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'public')));

  app.use(flash());
  app.use(session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 24 * 60 * 60 // 1 day
    })
  }));

  app.use(passport.initialize());
  app.use(passport.session());
};
