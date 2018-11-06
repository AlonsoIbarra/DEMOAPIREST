'use strict'
const mongoose = require('mongoose');
const app = require('./app');
const config = require('./config');

mongoose.connect(config.db, config.options, (err, res)=>{
	if (err) console.log("Error al conectar a la base de datos "+ (err));
	else console.log('Conexión a mongodb establecida...');
	app.listen(config.port, ()=>{
		console.log("API ejecutandose en http://localhost:"+config.port);
	});
});
