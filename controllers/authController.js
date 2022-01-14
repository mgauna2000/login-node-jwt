const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const connection = require('../database/db')
const {promisify} = require('util')

//procedimientos para registrarnos
exports.register = async (req, res) => {

    try {
        const name = req.body.name
        const user = req.body.user 
        const pass = req.body.pass
        let passHash = await bcryptjs.hash(pass, 8)
        
        connection.query('INSERT INTO users SET ?', {user: user, name: name, pass: passHash}, (error, result) => {
            if (error) {
                console.log(error)
            }
            res.redirect('/')
        })
    } catch (error) {
        console.log(error)
    }
}
//prcedimientos para logiarnos
exports.login = async (req ,res) => {
    try {
        const user = req.body.user
        const pass = req.body.pass

        if (!user || !pass) {
            res.render('login',{
                alert: true,
                alertTitle: "Advertencia",
                alertMessage: "Ingrese un usuario y contraseña",
                showConfirmButton: true,
                timer: false,
                ruta: "login"
            })
        }else{
            connection.query('SELECT * FROM users WHERE user = ?', [user], async (error, results) => {
                if (results.length == 0 || ! (await bcryptjs.compare(pass, results[0].pass))) {
                    res.render('login', {
                        alert: true,
                        alertTitle: "Error",
                        alertMessage: "Usuario o contraseña incorrectas",
                        alertIcon: "error",
                        showConfirmButton: true,
                        timer: false,
                        ruta: 'login'
                    })
                }else{
                    const id = results[0].id
                    const token = jwt.sign({id: id}, process.env.JWT_SECRETO, {
                        expiresIn: process.env.JWT_TIEMPO_EXPIRA
                    })
                    //generamos el token sin fecha de expiracion
                    console.log("TOKEN: "+token+" para el usuario: "+user)
                }
            })
        }
    } catch (error) {
        
    }
}