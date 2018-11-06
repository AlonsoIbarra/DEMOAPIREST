'use strict'
const services = require('../services');

function isAuth(request, response, next) {
	if(!request.headers.authorization)
		return response.status(403).send({message:'No tienes autorización.'});

	const token = request.headers.authorization.split(" ")[1];
	services.decodeToken(token)
		.then(response => {
			request.user = response;
			next();
		})
		.catch(err => {
			response.status(err.status)
		});
}

module.exports = isAuth;
