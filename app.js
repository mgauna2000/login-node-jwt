const express = require('express')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')

const app = express()
//seteamos el motor de plantilla
app.set('view engine', 'ejs')
//seteamos la carpeta public para archivos estaticos
app.use(express.static('public'))
//para procesar datos enviados desde form
app.use(express.urlencoded({extended:true}))
app.use(express.json())
//seteamos las variables de entorno
dotenv.config({path: './env/.env'})
//seteamos las cookies
app.use(cookieParser())
//lamar al router
app.use('/', require('./routes/router'))
//para eliminar el cache y que no se pueda volver con el boton de back luego de que hacemos un logout
app.use(function(req, res, next) {
    if (!req.user) 
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate')
    next()
})

app.listen(3000, ()=> {
    console.log('SERVER UP running in http://localhost:3000')
})