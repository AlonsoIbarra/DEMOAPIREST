'use strict'
const express = require('express');
const productController = require('../controllers/products');
const auth = require('../middleware/auth');
const api = express.Router();
const userController = require('../controllers/user');


api.get('/products/:id_producto', productController.getProduct);
api.get('/products', productController.getProducts);
api.post('/products', auth,  productController.postProduct);
api.delete('/products/:id_producto', auth,  productController.deleteProduct);
api.put('/products/:id_producto', auth,  productController.putProduct);

api.post('/signup', userController.signUp);
api.post('/signin', userController.signIn);
api.get('/users', userController.getUsers);
api.delete('/users/:id_user', userController.deleteUser);

api.get('/private', auth, (request, response) => {
	response.status(200).send({message: 'Tienes acceso'});
});

module.exports = api