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
app.use(cookieParser)

app.get('/', (req, res) => {
    res.send('Hola mundo')
})

app.listen(3000, ()=> {
    console.log('SERVER UP running in http://localhost:3000')
})