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
  res.render("auth/signup", {title2: "Signup"})
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

// router.post('/', ensureLoggedIn(), (req, res, next) => {
//   var input = req.body.search
//   res.redirect('/');
// })

// router.get('/profile', ensureLoggedIn(), (req,res) =>{
//   res.render('profile/dasboard')
// });
//
// router.post(PATHS.LOGIN_PATH, ensureLoggedOut(), passport.authenticate("local", {
//   successRedirect: PATHS.ROOT_PATH,
//   failureRedirect: PATHS.LOGIN_PATH,
//   failureFlash: true,
//   passReqToCallback: true
// }));
//
// router.get('/logout', ensureLoggedIn(), (req,res) =>{
//   req.logout()
//   res.redirect('/')
// })
//
// //mostrar usuario
// router.get('/profile/:id', (req, res, next) => {
//   const userId = req.params.id
//   User.findById(userId)
//   .then( user => {
//     console.log(user)
//     res.render('profile/dasboard',{userOwner: user})
//   })
//   .catch( err => next(err) )
// });
//
// // UPDATE
// router.get('/profile/:id/edit', ensureLoggedIn(), (req, res, next) => {
//   const userId = req.params.id
//   User.findById(userId, (err, user) => {
//     if (err) { return next(err) }
//     res.render('profile/user_edit', { titleE:'Edit form', user: user })
//   });
// });
//
// router.post('/profile/:id/edit', ensureLoggedIn(), upload.single('avatar'), (req, res, next) => {
//   const userId = req.params.id
//   const updates = {
//     first_name: req.body.first_name,
//     last_name: req.body.last_name,
//     username: req.body.username,
//     email: req.body.email,
//     phone: req.body.phone,
//     avatar: `/avatar/${req.file.filename}`
//   }
//   User.findByIdAndUpdate(userId, updates)
//   .then( response => res.redirect(`/profile/${userId}`))
//   .catch( err => next(err))
// })
//
// router.post('/', ensureLoggedIn(), (req, res, next) => {
//   var input = req.body.search
//   res.redirect('/');
// })


module.exports = router
