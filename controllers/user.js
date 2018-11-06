'use strict'

const mongoose = require('mongoose');
const User = require('../models/user');
const services = require('../services');

function signUp(request, response) {
	const user = new User({
		email : request.body.email,
		name: request.body.name,
		password: request.body.password
	});
	user.save((err)=>{
		if(err) return response.status(500).send({body: request.body, message: 'Error al guardar usuario. '+err});
		return response.status(200).send({body: request.body, token: services.createToken(user)});
	})
}

function signIn(request, response) {
	console.log(request.body);
	User.find({email: request.body.email}, (err, user) => {
		if (err) 
			return response.status(500).send({message:err});
		if (user.email == null) 
			return response.status(404).send({message:'Usuario no existe.'});
		else 
			return response.status(200).send({user:user, message:'Usuario autenticado.', token: services.createToken(user)});
		 
	});
}

function getUsers(request, response) {
	User.find({}, (err, users) =>{
		if(err)
			response.status(500).send({message:'Error al consultar. '+err});
		if(!users)
			return response.status(404).send({message:'Usuarios no existen.'});
		else 
			return response.status(200).send({users: users});
		 
	});
}

function deleteUser(request, response) {
	let id_user = request.params.id_user;
	User.findById(id_user, (err, user) =>{
		if(err)
			response.status(500).send({message:'Error al ejecutar la consulta. '+err});
		user.remove(err =>{
			if(err)
				response.status(500).send({message:'Error al borrar el usuario. '+err});
			else
				response.status(200).send({message:'Usuario eliminado',});
		});
	});
}

module.exports = {
	signIn,
	signUp,
	getUsers,
	deleteUser
}