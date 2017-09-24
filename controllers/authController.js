const bcrypt = require("bcrypt")
const bcryptSalt = 10
const User = require("../models/User")


module.exports = {
  signupGet: (req, res, next) => {
    res.render("auth/signup", {subtitle: "Signup"})
  },

  signupPost: (req, res, next) => {
    const first_name = req.body.first_name
    const last_name  = req.body.last_name
    const username   = req.body.username
    const email      = req.body.email
    const password   = req.body.password

    if (username === "" || password === "") {
      res.render("auth/signup", { message: "Indicate username and password", subtitle: "Signup" })
      return
    }

    User.findOne({ username }, "username", (err, user) => {
      if (user !== null) {
        res.render("auth/signup", { message: "The username already exists", subtitle: "Signup" })
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
      .catch(e => res.render("auth/signup", { message: "Something went wrong", subtitle: "Signup"} ) )
    });
  },

  loginGet: (req, res, next) => {
    res.render('auth/login',  {subtitle: "Login" , message: req.flash("error") })
  },

  logoutGet: (req, res, next) => {
    req.logout()
    res.redirect('/')
  },

}
