const express        = require('express');
const path           = require('path');
const expressLayouts = require("express-ejs-layouts");
const logger         = require('morgan');
const cookieParser   = require('cookie-parser');
const bodyParser     = require('body-parser');
const mongoose       = require('mongoose');


module.exports = function (app){

  app.set('views', path.join(__dirname, '../views'));
  app.set('view engine', 'ejs');
  app.set('layout', 'layouts/main-layout');
  app.use(expressLayouts);

  app.use((req,res,next) =>{
    res.locals.title = "Change it!";
    next();
  });

  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, '../public')));

};
