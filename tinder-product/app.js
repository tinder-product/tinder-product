const app       = require('express')();
const mongoose  = require('mongoose');

if (process.env.NODE_ENV === 'development') {
  require('dotenv').config();
}
mongoose.connect(process.env.MONGODB_URI);

require('./config/express')(app);
require('./config/session')(app);
require('./passport/serializers');
require('./passport/local');

const index = require('./routes/index');
const auth = require('./routes/auth');
app.use('/', index);
app.use('/', auth);

require('./config/error-handler')(app);

module.exports = app;
