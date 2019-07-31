'use strict' //Para usar otros tipos de variables, otras cosas

var express = require('express')
var bodyParser = require('body-parser') //Funciona como middleware esta librería

var app = express()
var api = require("./routes")

app.use(bodyParser.urlencoded({extended:true})) //Agregar los middlewares
app.use(bodyParser.json()) //Para poder admitir peticiones con formato json
app.use('/api',api) //Digo que voy usar api como palabra de principio en la url con el módulo api que he creado

/*
//Añadir las peticiones
//app.get('/hola',(req,res) =>{
app.get('/hola/:name',(req,res) =>{
	res.send({'message':`Hola ${req.params.name}`})
})*/


module.exports = app