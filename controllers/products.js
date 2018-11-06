'use strict'
const Product = require('./../models/product');

function getProduct(request, response){
	let id_producto = request.params.id_producto;
	Product.findById(id_producto, (err, product) =>{
		if(err)
			response.status(500).send({message:'Error al consultar.'});
		if(!product)
			response.status(404).send({message:'Producto no encontrado.'});
		else
			response.status(200).send({product});
	});
}
function getProducts(request, response){
	Product.find({}, (err, products) =>{
		if(err)
			response.status(500).send({message:'Error al consultar.'});
		if(!products)
			response.status(404).send({message:'Producto no encontrado.'});
		else
			response.status(200).send({products});
	});
}
function postProduct(request, response){
	console.log(request.body);
	let product = new Product();
	product.name = request.body.name;
	product.picture = request.body.picture;
	product.price = request.body.price;
	product.category = request.body.category;
	product.description = request.body.description;
	product.save((err, productStored)=>{
		if(err)
			response.status(500).send({message:'Error al guardar. '+err});
		else
			response.status(200).send({product: productStored, message:'producto guardado.'});
	});
}
function deleteProduct(request, response){
	let id_producto = request.params.id_producto;
	Product.findById(id_producto, (err, product) =>{
		if(err)
			response.status(500).send({message:'Error al ejecutar la consulta.'});
		product.remove(err =>{
			if(err)
				response.status(500).send({message:'Error al borrar el producto'});
			else
				response.status(200).send({message:'Producto eliminado',});
		});
	});
}
function putProduct(request, response){
	let id_producto = request.params.id_producto;
	let fields = request.body;
	Product.findByIdAndUpdate(id_producto, fields, (err, productUpdated) =>{
		if(err)
			response.status(500).send({message:'Error al ejecutar la consulta.'});
		else
			response.status(200).send({product:productUpdated});
	});
}
module.exports = {
	getProduct,
	getProducts,
	postProduct,
	deleteProduct,
	putProduct
}