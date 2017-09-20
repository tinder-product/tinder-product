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
    first_name: "prueba1",
    last_name: "prueba1",
    username: "prueba1",
    email: "prueba1",
    password: hashPass,
    avatar: "http://via.placeholder.com/350x350",
    phone: "925641564"
  },
  {
    first_name: "prueba2",
    last_name: "prueba2",
    username: "prueba2",
    email: "prueba2",
    password: hashPass,
    avatar: "http://via.placeholder.com/350x350",
    phone: "925641564"
  },
  {
    first_name: "prueba3",
    last_name: "prueba3",
    username: "prueba3",
    email: "prueba3",
    password: hashPass,
    avatar: "http://via.placeholder.com/350x350",
    phone: "925641564"
  },
  {
    first_name: "prueba4",
    last_name: "prueba4",
    username: "prueba4",
    email: "prueba4",
    password: hashPass,
    avatar: "http://via.placeholder.com/350x350",
    phone: "925641564"
  },
  {
    first_name: "prueba5",
    last_name: "prueba5",
    username: "prueba5",
    email: "prueba5",
    password: hashPass,
    avatar: "http://via.placeholder.com/350x350",
    phone: "925641564"
  },
];

const products = [
  {
    lat: 30522,
    lon: 5215,
    name: "moto",
    avatar: "http://via.placeholder.com/350x350",
    description: "moto",
    user_id:"prueba1",
    user_name: String
  },
]

user.create(users, (err, docs) => {
  if (err) {
    throw err;
  }
  mongoose.connection.close();
});
