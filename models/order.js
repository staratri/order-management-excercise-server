let mongoose = require("mongoose");

var jwt = require('jsonwebtoken');
var bcrypt = require("bcryptjs")
var Promise = require("bluebird")
var config = require("../config")

let Schema = mongoose.Schema;
let OrderSchema = new Schema({
  user_id: {
    type: String,
    trim: true
  },
  amount: {
    type: Number,
    trim: true
  },
  products: {
    type: Array,
  },
}, {
  timestamps: true,
});

let Order = mongoose.model("order", OrderSchema);

module.exports = Order;
