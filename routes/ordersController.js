var express = require('express');
var router = express.Router();
var Order = require('../models/order');

router.post('/create', function(req, res, next) {
	var products = req.body.products;
	var user_id = req.user._id;
	console.log(req)
	var amount = req.body.amount;
	if (!products || !Array.isArray(products)) {
		return res.status(400).send({
			status: "Fail",
			message: "Invalid products."
		});
	}
	console.log(amount)
	var OrderInst = new Order({
		products,
		user_id,
		amount
	});
	return OrderInst.save().then(function(order) {
		res.send({
			order_id: order._id
		});
	});
});
router.get('/', function(req, res, next) {
	Order.find({user_id: req.user._id})
	.then(function(orders) {
		return res.json({status : 1, response : orders, message : 'success'});
	}).catch(err=>{
        return res.json({status : 0, response : err, message : 'failure'});
    })
});

module.exports = router