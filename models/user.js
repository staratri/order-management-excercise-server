let mongoose = require("mongoose");

var jwt = require('jsonwebtoken');
var bcrypt = require("bcryptjs")
var Promise = require("bluebird")
var config = require("../config")

let Schema = mongoose.Schema;
let UserSchema = new Schema({
  name: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    trim: true
  },
  password: {
    type: String,
    trim: true
  },
}, {
  timestamps: true,
});

UserSchema.statics.findByCredentials = function(email, password) {
  var User = this;
  return User.findOne({
    email
  }).then((user) => {
    if (user && bcrypt.compareSync(password, user.password)) {
        var details = {_id : user._id.toHexString(), email: user.email, name: user.name};
        return {token: jwt.sign(details, config.jwt_secret).toString(), details};
    }
    return Promise.reject("Invalid Credentials.");
  });
};

UserSchema.statics.findByToken = function(token) {
  var decoded_json;
  try {
    decoded_json = jwt.verify(token, config.jwt_secret);
  }catch (e) {
    return Promise.reject(e)
  }
  return Promise.resolve(decoded_json);
};

UserSchema.pre("save", function(next) {
  var user = this;
  if (user.isModified("password")) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, function(err, hash) {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

let User = mongoose.model("User", UserSchema);

module.exports = User;