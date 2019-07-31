var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Libreria para cifrar contraseñas
var bcrypt = require('bcrypt-nodejs')

//Libreria de crypto
var crypto = require('crypto')

var UserSchema = new Schema({
	name:String,
	email:{type:String,unique:true,lowecase:true},
	avatar:String,
	password:{type:String, select:false}, //select:false para que cuando se hace un get a un usuario la contraseña no la envíe
	signupDate:{type:Date, default: Date.now()},
	lastLogin: Date //Para cada vez que el usuario se loguee se actualiza y se tenga un control de acceso
})

//UserSchema.pre('save',(next)=>{ //Recibe el parámetro next para que pase al siguiente middleware
UserSchema.pre('save',function(next){
	let user = this;
	if(!user.isModified('password')){//El usuario no ha notificado su contraseña
		return next() //Termine y pase al siguiente middleware
	}else{
		bcrypt.genSalt(10,(err,salt)=>{
			if(err){
				return next() //Si hay un error se pase al siguiente middleware
			}else{
				bcrypt.hash(user.password, salt, null,(err,hash)=>{
					if(err){
						return next(err) //Se devuelve el error
					}else{
						user.password = hash
						next()
					}
				})
			}
		})
	}

}) //Antes que se salve, se ejecute lo siguiente 

UserSchema.methods.gravatar = function(){
	if(!this.email){//Que no hay un email registrado en gravatar
		return `https://gravatar.com/avatar/?s=200&d=retro` //Devuelve un avatar por defecto dentro de esta url
	}else{
		var md5 = crypto.createHash('md5').update(this.email).digest('hex') //Crear un hash MD5 que por defecto pone gravatar en las url de los avatares
		return `https://gravatar.com/avatar/${md5}?s=200&d=retro`
	}
}

module.exports = mongoose.model('Usuario',UserSchema)
