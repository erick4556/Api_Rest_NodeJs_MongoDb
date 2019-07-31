'use strict'

var Product = require('../modelos/product')

function getProducts(req, res){
	//app.get('/api/product',(req,res)=>{
	/*var array = [
	true,'A',{
		name:"Carl",
		apellido:'Mendez',
		fun: function(a){
			return a;
		}
	}
	];

	console.log(array[2].fun(array[1]));

	res.send(200,{products:[true,'A',{
		name:"Carl",
		apellido:'Mendez'
	}]});*/

	/*Product.find((err,product)=>{
		if(err)return res.status(500).send({message:'Error al realizar la petición'})
		

		res.status(200).send({product:product})	

	})*/


	/* //Otra forma
	Product.find({},(err,producto) =>{
		if(err){
			return res.status(500).send({message:'Error al realizar la petición'})
		}else{
			res.status(200).send({product:producto})
		}
	})*/

	Product.find({}).exec(function(err,producto){
		if(err){
			return res.status(500).send({message:'Error al realizar la petición'})
		}else{
			res.status(200).send({product:producto})
		}
	})

	
	
//});
}

function saveProduct(){
	//app.post('/api/product',(req,res)=>{
	/*console.log(req.body); //Tengo todo lo que se mande en el cuerpo de la petición
	res.status(200).send({
		message:'Producto se ha recibido'
	})*/
	console.log('POST','/api/product/')
	console.log(req.body) //Para obtener el cuerpo de la cabecera

	//Almacenar en la base de datos
	let product = new Product()
	product.name = req.body.name
	product.picture = req.body.picture
	product.price = req.body.price
	product.category = req.body.category
	product.descripcion = req.body.descripcion

	product.save((err,productStored) =>{
		if(err){
			res.status(500).send({
				message:`Error al salvar la base de datos: ${err}`
			})
		}else{
			res.status(200).send({product:productStored})
		}
		/*if(err)res.status(500).send({message:`Error al salvar la base de datos: ${err}`})
			
		res.status(200).send({product:productStored})*/	
	})
//});
}


function getProduct(req,res){
	//app.get('/api/product/:productId',(req,res)=>{
	let productId = req.params.productId

	Product.findById(productId,(err,product)=>{
		if(err)return res.status(500).send({message:`Error al buscar el producto en la base de datos: ${err}`})
		if(!product)return res.status(404).send({'message':"El producto no existe"})

		res.status(200).send({product:product})	

	})

//})
}


function updateProduct(req,res){
	//app.put('/api/product/actualizar/:productId',(req,res)=>{
	let productId = req.params.productId
	let update = req.body //Objeto con los campos que quiero actualizar

	Product.findByIdAndUpdate(productId, update, (err,productUpdated) =>{
		if(err){
			res.status(500).send({
				message: `Error al actualizar el producto : ${err}`
			})
		}else{
			res.status(200).send({product:productUpdated})
		}

	})
//});
}


function deleteProduct(req,res){
	//app.delete('/api/product/eliminar/:productId',(req,res)=>{
	let productId = req.params.productId

	Product.findById(productId,(err,product)=>{
		if(err){
			res.status(500).send({
				message: `Error al borrar el producto: ${err}`
			})
		}else{
			product.remove(err =>{
				if(err){
					res.status(500).send({
						message: `Error al borrar el producto: ${err}`
					})
				}else{
					res.status(200).send({
						message: "El producto ha sido eliminado"
					})
				}	
			})
		}
	})
//});
}


module.exports = {
	getProduct,
	saveProduct,
	getProducts,
	updateProduct,
	deleteProduct
}

