var express = require('express')

var productController = require('../controllers/product')

var userController = require('../controllers/user')

var auth = require('../middlewares/auth')

var api = express.Router()

//Llamadas de las funciones del controlador
//api.get('/api/product',productController.getProducts) Quito la palabra api del principio por que en otro archivo digo que lo voy usar

api.get('/product',auth,productController.getProducts)

api.get('/product/:productId',productController.getProduct)

api.post('/product/post',productController.saveProduct);

api.put('/product/actualizar/:productId',auth,productController.updateProduct);

api.delete('/product/eliminar/:productId',auth,productController.deleteProduct);

api.post('/signup',userController.signUp)
api.post('/signin',userController.signIn)

api.get('/private',auth, (req,res)=>{
	res.status(200).send({message:"Tienes acceso"})
})

module.exports = api