var User = require("../models/user");
var Promise = require("bluebird")

users = [];
for (var i = 1; i < 6; i++) {
	users.push({
		name: "User " + i,
		email: "user" + i + "@demo.com",
		password: "123123 ",
	})
}


function creatUsers(argument) {
	return Promise.map(users, function(user) {
		var userInst = new User(user);
		return userInst.save();
	})
	.then(function(users) {
		console.log('All users created:', users);
	})
	.catch(function(err) {
		console.log('Error while creating users:', err);
	})
}

module.exports = creatUsers;