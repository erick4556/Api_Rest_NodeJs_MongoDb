/*var jwt = require('jwt-simple')

var moment = require('moment')

var config = require('../config')*/

var services = require('../services')

function isAuth(req, res, next) {

    if (!req.headers.authorization) {
        return res.status(403).send({
            message: "No tienes autorización"
        })
    } else {
        /*}else{
        	//Token que ha enviado el cliente en la cabecera
        	var token = req.headers.autorization.split(' ')[1] //Desglozo con el split. La cabecera de autorización incluye
        //un texto beare, un espacío y luego el token. Con el split lo que hago es, toda esa cabecera la convierta en un
        //array con tantos elementos como espacios hay.
        	var payload = jwt.decode(token,config.SECRET_TOKEN) //Objeto descodificado que envia el usuario

        	if(payload.exp<=moment().unix()){
        		return res.status(401).send({
        			message:"El token ha expirado"
        		})
        	}else{
        		req.user = payload.sub
        		next()
        	}*/

        const token = req.headers.authorization.split(' ')[1]
            //const token = req.headers.authorization


        services.decodeToken(token)
            .then(response => {
                req.user = response;
                next(); //Paso al siguiente middleware o al controlador final
            })
            .catch(response => {
                res.status(response.status)
            })

    }
}

module.exports = isAuth