const bcrypt = require("bcrypt");
const bcryptSalt = 10;
const path = require('path');
const passport = require('passport');
const router = require('express').Router();

const multer = require('multer');
const destination = path.join(__dirname, "../public/avatar/");
const upload = multer({dest : destination});

router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

router.post("/signup", upload.single('avatar'), (req, res, next) => {
  const first_name = req.body.first-name;
  const last_name = req.body.last-name;
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const avatar = req.body.avatar;
  const phone = req.body.phone;

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
      password: password,
      avatar: '/avatar/${req.file.filename}',
      phone: phone,
    })
    .save()
    .then(user => res.redirect('/'))
    .catch(e => res.render("auth/signup", { message: "Something went wrong" }));
  });
});

module.exports = router;
