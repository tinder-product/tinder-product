const bcrypt = require("bcrypt");
const passport = require('passport');
const User = require('../models/User');
const LocalStrategy = require("passport-local").Strategy;
const path = require('path');

passport.use(new LocalStrategy((username, password, next) => {
  console.log(username, password);
  User.findOne({ username }, (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      console.log(err, user);
      return next(null, false, { message: "Incorrect username" });
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return next(null, false, { message: "Incorrect password" });
    }
    return next(null, user);
  });
}));
