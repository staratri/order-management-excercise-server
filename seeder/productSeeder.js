var Product = require("../models/product");
var Promise = require("bluebird")

products = [];
for (var i = 1; i < 6; i++) {
	products.push({
		name: "Product " + i,
		price: parseInt(Math.random() * 1000),
		images: [],
		types: [],
	})
}


function creatProducts() {
	return Promise.map(products, function(product) {
		var productInst = new Product(product);
		return productInst.save();
	})
	.then(function(users) {
		console.log('All products created:', users);
	})
	.catch(function(err) {
		console.log('Error while creating products:', err);
	})
}

module.exports = creatProducts;