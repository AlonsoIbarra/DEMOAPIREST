'use strict'
const express = require('express');
const bodayParser = require('body-parser');
const hbs = require('express-handlebars');
const app = express();
const api = require('./routes');

app.use(bodayParser.urlencoded({extended: false}));
app.use(bodayParser.json());
app.engine('.hbs', hbs({
	defaultlayout: 'default',
	extname: '.hbs'
}));
app.set('view engine', '.hbs');

app.use('/api',api);
app.get('/login', (request, response)=>{
	response.render('login');
});

module.exports = app