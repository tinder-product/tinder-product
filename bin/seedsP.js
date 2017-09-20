const mongoose = require("mongoose")
const product  = require("../models/Product")

mongoose.connect('mongodb://localhost/tinder-product')


const products = [
  {
    lat: 30522,
    lon: 5215,
    name: "moto",
    avatar: "http://via.placeholder.com/350x350",
    description: "moto",
    user_id:"59c258a1242e590e48e8e849",
    user_name: "prueba5"
  },
  {
    lat: 30,
    lon: 52,
    name: "avion",
    avatar: "http://via.placeholder.com/350x350",
    description: "volador",
    user_id:"59c258a1242e590e48e8e848",
    user_name: "prueba4"
  },
  {
    lat: 500,
    lon: 960,
    name: "barco",
    avatar: "http://via.placeholder.com/350x350",
    description: "volador",
    user_id:"59c258a1242e590e48e8e847",
    user_name: "prueba3"
  },
  {
    lat: 55200,
    lon: 8500,
    name: "tejas",
    avatar: "http://via.placeholder.com/350x350",
    description: "para baños",
    user_id:"59c258a1242e590e48e8e846",
    user_name: "prueba2"
  },
  {
    lat: 200,
    lon: 800,
    name: "bañeras",
    avatar: "http://via.placeholder.com/350x350",
    description: "para focas",
    user_id:"59c258a1242e590e48e8e845",
    user_name: "prueba1"
  },

]

product.create(products, (err, docs) => {
  if (err) {
    throw err;
  }
  mongoose.connection.close();
});
