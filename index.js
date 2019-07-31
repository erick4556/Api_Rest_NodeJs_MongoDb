
var mongoose = require('mongoose')

var app = require('./app')

//var port = process.env.PORT || 3001;

var config = require('./config')

//mongoose.connect('mongodb://localhost:27017/shop',(err,res)=>{
mongoose.connect(config.db,(err,res)=>{
	if(err){
		console.log(`Error a conectarse con la base de datos : ${err}`)
	}else{
		console.log("Conexión a la base de dato establecida")
	}

		//app.listen(port,()=>{
		app.listen(config.port,()=>{	
		console.log(`API REST corriendo en http://localhost:${config.port}`);
	})
})

