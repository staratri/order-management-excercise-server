let mongoose = require("mongoose");

var jwt = require('jsonwebtoken');
var bcrypt = require("bcryptjs")
var Promise = require("bluebird")
var config = require("../config")

let Schema = mongoose.Schema;
let ProductSchema = new Schema({
  name: {
    type: String,
    trim: true
  },
  price: {
    type: Number,
    trim: true
  },
  images: {
    type: Array,
  },
  types: {
    type: Array,
  },
}, {
  timestamps: true,
});

let Product = mongoose.model("product", ProductSchema);

module.exports = Product;