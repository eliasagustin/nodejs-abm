const express = require('express')
const path = require('path')
const connection = require('./connection')
const app = express()
const user = require('./routes/users')
const loggedMiddleware = require('./middlewares/logged')


//Configuracion de la aplicacion en express
app.set('title', 'Aplicación realizada en NodeJS')
app.set('port', 3000)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views')) 
                    // const  my_middlware = (req, resp, next) => {
                    //     console.log('Ejecutando middleware')
                    //     next() //esta sentencia da lugar a que se ejecute la respuesta del servidor en esta caso
                    // }
                    // app.use(my_middlware)

//seccion middleware
                    // app.use(loggedMiddleware.isLogged)
                    //app.use(express.static(__dirname + '/public')) //es un middleware que viene por default en express
app.use(express.static(path.join(__dirname, 'public'))) //es un middleware que viene por default en express
app.use(express.urlencoded({extended:false}))

// ruta principal
app.get('/', (req, res) => {
    res.render('index')
})
                    // app.get('/users', (req, res) => {
                    //     res.send('Mostrando todos los usuarios')
                    // })

app.use('/users',user)

app.listen(app.get('port'), () => {
    console.log('Mi ' + app.get('title') + ' está snifiando por el puerto ' + app.get('port'))
})
