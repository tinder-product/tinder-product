const session      = require('express-session');
const MongoStore   = require("connect-mongo")(session);
const flash        = require("connect-flash");
const mongoose     = require('mongoose');
const passport     = require("passport");


module.exports = function (app){
  app.use(flash());
  app.use(session({
    secret: "vero&santi",
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
