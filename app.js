const app       = require('express')()
const mongoose  = require('mongoose')

if (process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}
mongoose.connect(process.env.MONGODB_URI)

require('./config/session')(app)
require('./config/express')(app)
require('./passport/serializers')
require('./passport/local')

app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});

const index = require('./routes/index')
const auth = require('./routes/auth')
const products = require('./routes/products')
app.use('/', index)
app.use('/', auth)
app.use('/', products)

require('./config/error-handler')(app)

module.exports = app
