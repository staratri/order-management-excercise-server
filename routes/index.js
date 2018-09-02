var express = require('express');
var router = express.Router();

var User = require('../models/user');

router.post('/login', function (req, res, next) {
	if (!req.body.email || !req.body.password) {
		return res.status(400).send({status: "fail", message: "Please provide email and password."});
	}
	User.findByCredentials(req.body.email, req.body.password)
	.then((user) => {
		return res.header('x-auth', user.token).send(user);
	}).catch(function(err) {
		return res.status(400).send({status: "fail", message: err});
	});
});

router.use((req, res, next) => {
	var token = req.header("x-auth");
	if (!token) {
		return res.status(400).send({status: "fail", message: "Unautorized"});
	}
	User.findByToken(token)
	.then((user) => {
		if (!user) {
			return Promise.reject("Unautorized");
		}
		req.user = user;
		next();
	}).catch((err) => {
		return res.status(400).send({
			status: "Fail",
			message: "Unautorized"
		});
	});
});

router.get('/user', function(req, res, next) {
	return res.send(req.user);
});


module.exports = router;
