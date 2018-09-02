var express = require('express');
var router = express.Router();
var Product = require('../models/product');

router.get('/', function(req, res, next) {
	Product.find()
	.then(function(products) {
		return res.json({status : 1, response : products, message : 'success'});
	}).catch(err=>{
        return res.json({status : 0, response : err, message : 'failure'});
    })
});

module.exports= router