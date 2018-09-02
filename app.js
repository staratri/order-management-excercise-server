var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var cors = require('cors')
var config = require("./config");
var indexRouter = require('./routes/index');
const productsController = require('./routes/productsController')
const ordersController = require('./routes/ordersController')

var app = express();

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect('mongodb://localhost:27017/' + config.db, { useNewUrlParser: true }).then(function() {
  mongoose.set("debug", config.mode == "dev");
}).catch(function(err) {
    console.log(err)
});

app.use('/', indexRouter);
app.use('/products', productsController)
app.use('/orders', ordersController)

module.exports = app;
