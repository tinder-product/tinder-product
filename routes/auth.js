const bcrypt = require("bcrypt")
const bcryptSalt = 10
const path = require('path')
const passport = require('passport')
const router = require('express').Router()
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login')
const User = require("../models/User")
const multer = require('multer')
const destination = path.join(__dirname, "../public/avatar")
const upload = multer({dest : destination})




router.get('/signup',  ensureLoggedOut(), (req, res, next) => {
  res.render("auth/signup", {subtitle: "Signup"})
});

router.post('/signup', upload.single('avatar'), ensureLoggedOut(), (req, res, next) => {

  const first_name = req.body.first_name
  const last_name  = req.body.last_name
  const username   = req.body.username
  const email      = req.body.email
  const password   = req.body.password

  if (username === "" || password === "") {
    res.render("auth/signup", { message: "Indicate username and password" })
    return
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.render("auth/signup", { message: "The username already exists" })
      return
    }

    const salt = bcrypt.genSaltSync(bcryptSalt)
    const hashPass = bcrypt.hashSync(password, salt)

    const newUser = new User({
      first_name: first_name,
      last_name: last_name,
      username: username,
      email: email,
      password: hashPass,
    })
    .save()
    .then(user => res.redirect('/'))
    .catch(e => res.render("auth/signup", { message: "Something went wrong" }))
  });
});

router.get('/login', ensureLoggedOut(), (req,res) =>{
  res.render('auth/login',  {title3: "Login"})
});

router.post('/login', ensureLoggedOut(), passport.authenticate("local", {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true,
  passReqToCallback: true
}));

router.get('/logout', ensureLoggedIn(), (req,res) =>{
  req.logout()
  res.redirect('/')
})


module.exports = router
