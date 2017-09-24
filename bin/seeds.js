const mongoose = require("mongoose")
const user     = require("../models/User")
const product  = require("../models/Product")
const bcrypt = require("bcrypt")
const bcryptSalt = 10

mongoose.connect('mongodb://localhost/tinder-product')
const salt = bcrypt.genSaltSync(bcryptSalt)
const hashPass = bcrypt.hashSync("1234", salt)

const users = [
  {
    first_name: "Verónica",
    last_name: "González",
    username: "veroglez",
    email: "vero@gmail.com",
    password: hashPass,
    avatar: "http://via.placeholder.com/350x350",
    phone: "925641564"
  },
  {
    first_name: "Santiago",
    last_name: "Trigo",
    username: "trigoporres",
    email: "santi@gmail.com",
    password: hashPass,
    avatar: "http://via.placeholder.com/350x350",
    phone: "925641564"
  },
  {
    first_name: "Victor",
    last_name: "Rodriguez",
    username: "victor.rodriguez",
    email: "victor@gmail.com",
    password: hashPass,
    avatar: "http://via.placeholder.com/350x350",
    phone: "925641564"
  },
  {
    first_name: "Andrei",
    last_name: "Fernandez",
    username: "Andrei94",
    email: "andre@gmail.com",
    password: hashPass,
    avatar: "http://via.placeholder.com/350x350",
    phone: "925641564"
  },
  {
    first_name: "Miguel",
    last_name: "Moracho",
    username: "xenock",
    email: "miguel@gmail.com",
    password: hashPass,
    avatar: "http://via.placeholder.com/350x350",
    phone: "925641564"
  },
];

// const products = [
//   {
//     lat: 30522,
//     lon: 5215,
//     name: "moto",
//     avatar: "http://via.placeholder.com/350x350",
//     description: "moto",
//     user_id:"prueba1",
//     user_name: String
//   },
// ]

user.create(users, (err, docs) => {
  if (err) {
    throw err;
  }
  mongoose.connection.close();
});
