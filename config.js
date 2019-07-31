module.exports = {
	port:process.env.PORT || 3001, 
	db: process.env.MONGODB || 'mongodb://localhost:27017/shop', //Si no existe esa variable de entorno por que se esta en desarrollo use la otra ruta
	SECRET_TOKEN:'miclavedetokens'
}