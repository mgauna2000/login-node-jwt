const express = require('express')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')

const app = express()
//seteamos el motor de plantilla
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.send('Hola mundo')
})

app.listen(3000, ()=> {
    console.log('SERVER UP running in http://localhost:3000')
})