'use strict' //Para usar otros tipos de variables, otras cosas

var express = require('express')
var bodyParser = require('body-parser') //Funciona como middleware esta librería
//var ejs = require('ejs')
const hbs = require('express-handlebars')
var app = express()
var api = require("./routes")

app.use(bodyParser.urlencoded({extended:true})) //Agregar los middlewares
app.use(bodyParser.json()) //Para poder admitir peticiones con formato json
app.use('/api',api) //Digo que voy usar api como palabra de principio en la url con el módulo api que he creado

/*app.engine('.ejs',ejs({//Le digo que los ficheros con extensión ejs, usen ejs 
	defaultLayout:'default',
	extname:'.ejs' //Use esa extensión por defecto
}))	*/

//app.set('view engine','.ejs')
app.engine('.hbs',hbs({
	defaultLayout : 'default',
	extname : '.hbs'
}))
app.set('view engine', '.hbs')

app.get('/login',(req,res)=>{ //La ruta
	res.render('layouts/login') //La vista que quiero que renderize
})

/*
//Añadir las peticiones
//app.get('/hola',(req,res) =>{
app.get('/hola/:name',(req,res) =>{
	res.send({'message':`Hola ${req.params.name}`})
})*/


module.exports = app