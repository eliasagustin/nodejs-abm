// Sirve para encontrar la ruta
// const path = require('path')
// const root = path.join(__dirname, '../public')

// Hardcodenado el array de objetos de usuarios
const users = [
    {
        id: 1,
        name: 'Agustin',
        age: 36
    },
    {
        id: 2,
        name: 'Fercha',
        age: 31
    },
    {
        id: 3,
        name: 'Eugenia',
        age: 34
    },
]

const User = require('../models/users.js')
const connection = require('../connection')

const getUsers = (req, res) => {
    User.find({}, (err, result) => {
        if(err){
            console.log('Error al ejectura la consulta')
        } else {
            console.log('Consulta Mongo ejecutada correctamente')
            console.log(result)
            res.render('users.ejs', {users: result} )
        }
    })
}

//Funcion para obtener las vistas
const getCreateUser = (req, res) => {
    //res.send('Crear usuario')
    res.render('create-user.ejs')
}

//Funcion para obtener las vistas
const getUpdateUser = (req, res) => {
    const param = req.params.id
    console.log('El parámetro que está llegando es: ' + param)
    User.find({_id: param}, (err, result) => {
        if (err) {
            console.log('Error en consulta update users ' + err)
        } else {
            console.log('result:')
            console.log(result)
            res.render('update-user', {user: result})
        }
    })
}

//Funcion para obtener las vistas
const getDeleteUser = (req, res) => {
    const param = req.params.id
    console.log('El parámetro que está llegando es: ' + param)

    User.find({_id: param}, (err, result) => {
        if (err) {
            console.log('Error en consulta update users ' + err)
        } else {
            console.log('result:')
            console.log(result)
            res.render('delete-user', {user: result})
        }
    })
}

const createUser = (req, res) => {
    console.log('enviando object:')
    console.log(req.body)
    const data = req.body
    // Creo obj user para guardar
    const user = new User({
        name: data.name,
        age: data.age
    })
    //guardo obj user
    user.save( data, (err, result) => {
        if(err) {
            console.log('Ocurrió un error al tratar de insertar la nueva entrada')
        } else {
            console.log('Usuario registrado')
            //si bien podría usar el render prefiero usar el redirect
            // en vez de pasar por el render todos los datos de usuario
            res.redirect('/users/all')
        }
    })
}

const updateUser = (req, res) => {
    const param = req.params.id
    const data = req.body
    User.findOneAndUpdate({ _id: param}, data, (err, result) => {
        if (err) {
            console.log('Error en consulta Update SQL' + err)
        } else {
            console.log('Registro actualizado correctamente')
            res.redirect('/users/all')
        }
    })
}

const deleteUser = (req, res) => {
    const param = req.params.id
   
    User.deleteOne({_id: param}, (err, result) => {
        if (err) {
            console.log('Error en consulta Update SQL' + err)
        } else {
            console.log('El registro se ha eliminado')
            res.redirect('/users/all')
        }
    })
}

module.exports = {getUsers, getCreateUser, getUpdateUser, getDeleteUser, createUser, updateUser, deleteUser}