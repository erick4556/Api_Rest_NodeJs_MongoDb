//'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
	name:String,
	picture:String,
	price:{type:Number, default:0},
	category:{type:String, enum:['computers','phones','accesorios']}, //Tipo de categorías que van existir solamente
	descripcion:String,
})

module.exports = mongoose.model('Product',ProductSchema) //Exportar el modelo

