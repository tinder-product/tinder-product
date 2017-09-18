const bcrypt     = require("bcrypt");
const bcryptSalt = 10;
const path       = require('path');
const passport   = require('passport');
const router     = require('express').Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const User       = require("../models/User");
const PATHS      = require("./paths");
const multer     = require('multer');
const destination= path.join(__dirname, "../public/avatar/");
const upload     = multer({dest : destination});

router.get(PATHS.SIGNUP_PATH, ensureLoggedOut(), (req, res, next) => {
  res.render("auth/signup");
});

router.post(PATHS.SIGNUP_PATH, upload.single('avatar'), ensureLoggedOut(), (req, res, next) => {
  const first_name = req.body.first_name;
  const last_name  = req.body.last_name;
  const username   = req.body.username;
  const email      = req.body.email;
  const password   = req.body.password;
  const avatar     = req.body.avatar;
  const phone      = req.body.phone;

  if (username === "" || password === "") {
    res.render("auth/signup", { message: "Indicate username and password" });
    return;
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.render("auth/signup", { message: "The username already exists" });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      first_name: first_name,
      last_name: last_name,
      username: username,
      email: email,
      password: hashPass,
      avatar: '/avatar/${req.file.filename}',
      phone: phone,
    })
    .save()
    .then(user => res.redirect('/'))
    .catch(e => res.render("auth/signup", { message: "Something went wrong" }));
  });
});

router.get(PATHS.LOGIN_PATH, ensureLoggedOut(), (req,res) =>{
  res.render('auth/login');
});

router.get(PATHS.DASBOARD_PATH, ensureLoggedIn(), (req,res) =>{
  res.render('dasboard');
});

router.post(PATHS.LOGIN_PATH, ensureLoggedOut(), passport.authenticate("local", {
  successRedirect: PATHS.DASBOARD_PATH,
  failureRedirect: PATHS.LOGIN_PATH,
  failureFlash: true,
  passReqToCallback: true
}));

router.get(PATHS.LOGOUT_PATH, ensureLoggedIn(), (req,res) =>{
  req.logout();
  res.redirect(PATHS.ROOT_PATH);
});

module.exports = router;
