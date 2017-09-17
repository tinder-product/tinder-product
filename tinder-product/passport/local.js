const bcrypt = require("bcrypt");
const passport = require('passport');
const User = require('../models/User');
const LocalStrategy = require("passport-local").Strategy;
const path = require('path');

passport.use(new LocalStrategy((username, password, next) => {
  User.findOne({ username }, (err, user) => {
    if (err) {
      console.log("1");
      return next(err);
    }
    if (!user) {
      console.log("2");

      return next(null, false, { message: "Incorrect username" });
    }
    if (!bcrypt.compareSync(password, user.password)) {
      console.log("3");

      return next(null, false, { message: "Incorrect password" });
    }
    return next(null, user);
  });
}));
