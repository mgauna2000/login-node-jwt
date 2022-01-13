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