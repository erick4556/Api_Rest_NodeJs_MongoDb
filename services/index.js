var jwt = require('jwt-simple')
var moment = require('moment')
var config = require('../config')

function createToken(user) {
    var payload = {
            sub: user._id, //id del usuario, pero no debería ser el de la base de datos
            iat: moment().unix(), //Cuando fue creado el token. Devuelve tiempo en formato en unix
            exp: moment().add(14, 'days').unix() //Cuando va expirar el token
        } //Datos que viajan del cliente al servidor

    return jwt.encode(payload, config.SECRET_TOKEN) //Devuelve el token codificado

}

function decodeToken(token) {
    //promesa. resolve: Cuando la promesa esta resuelta, se ha resuelto la función que hay que llamar
    //reject: Ha ocurrido un error y la promesa no se ha podido cumplir
    var decoded = new Promise((resolve, reject) => {
        try {

            var payload = jwt.decode(token, config.SECRET_TOKEN)

            if (payload.exp <= moment().unix()) {
                reject({
                    status: 401,
                    message: 'El token ha expirado'
                })
            }
            /*else{
            				resolve(payload.sub)
            			}*/

            resolve(payload.sub)

        } catch (err) {
            reject({
                status: 500,
                message: 'Invalid token'
            })
        }
    })

    return decoded

}


module.exports = {
    createToken,
    decodeToken
}