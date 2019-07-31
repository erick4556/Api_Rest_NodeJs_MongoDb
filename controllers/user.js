var moongose = require('mongoose')

var User = require('../modelos/Usuario')

var service = require('../services/index')

function signUp(req,res){
	var user = new User({
		name: req.body.name,
		email:req.body.email,
		password:req.body.password
	})

	user.save((err)=>{
		if(err){
			res.status(500).send({
				message:`Error al crear el usuario: ${err}`
			})
		}else{
			return res.status(201).send({
				token:service.createToken(user)
			})
		}
	})
}

function signIn(req,res){

	User.find({email:req.body.email},(err,user)=>{
		if(err){
			return res.status(500).send({
				message:err
			})
		}

		if(!user){
			return res.status(404).send({
				message:'No existe el usuario'
			})
		}

		req.user = user
		res.status(200).send({
			message:'Te has logueado correctamente',
			token:service.createToken(user)
		})
	})

}

module.exports = {
	signUp,
	signIn
}