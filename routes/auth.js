const path = require('path')
const passport = require('passport')
const router = require('express').Router()
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login')
const multer = require('multer')
const destination = path.join(__dirname, "../public/avatar")
const upload = multer({dest : destination})
const authController = require("../controllers/authController")


router.get('/signup',  ensureLoggedOut(), authController.signupGet);

router.post('/signup', upload.single('avatar'), ensureLoggedOut(), authController.signupPost);

router.get('/login', ensureLoggedOut(), authController.loginGet);

router.post('/login', ensureLoggedOut(), passport.authenticate("local", {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash:   true,
  passReqToCallback: true
}));

router.get('/logout', ensureLoggedIn(),  authController.logoutGet)
 

module.exports = router
