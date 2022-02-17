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

const connection = require('../connection')

const getUsers = (req, res) => {
    //res.sendFile('users.html', {root: root})
    const sql = 'SELECT * FROM users'
    connection.query(sql, (err, result) => {
        if(err){
            console.log('Error al ejectura la consulta')
        } else {
            console.log('Consulta SQL ejecutada correctamente')
            console.log(result)
            res.render('users.ejs', {users: result} )
        }
    })
    //res.render('users.ejs', {users: users} )
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
    const sql = 'select * from users where id=?' //el "?" sirve para pasar un parametro que es el Id
    connection.query(sql, param, (err, result) => {
        if (err) {
            console.log('Error en consulta update users ' + err)
        } else {
            console.log('result:')
            console.log(result)
            res.render('update-user', {user: result})
        }
    })
    //console.log('El parámetro que está llegando es: ' + param)
    //res.send('Modificar usuario')
    //res.render('update-user.ejs')
}

//Funcion para obtener las vistas
const getDeleteUser = (req, res) => {
    const param = req.params.id
    console.log('El parámetro que está llegando es: ' + param)
    const sql = 'select * from users where id=?' //el "?" sirve para pasar un parametro que es el Id
    connection.query(sql, param, (err, result) => {
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
    const sql = 'insert into users SET ?' //el "SET ?" sirve para pasar un parametro QUE ES UN OBJETO
    const data = req.body
    connection.query(sql, data, (err, result) => {
        if(err) {
            console.log('Ocurrió un error al tratar de insertar la nueva entrada')
        } else {
            console.log('Usuario registrado')
            //si bien podría usar el render prefiero usar el redirect
            // en vez de pasar por el render todos los datos de usuario
            res.redirect('/users/all')
        }
    })
    // users.push(req.body)
    // res.render('users', {users: users} )
}

const updateUser = (req, res) => {
    const param = req.params.id
    const sql = `update users SET name='${req.body.name}', age='${req.body.age}' where id='${param}'`
    connection.query(sql, (err, result) => {
        if (err) {
            console.log('Error en consulta Update SQL' + err)
        } else {
            console.log('Registro actualizado correctamente')
            res.redirect('/users/all')
        }
    })
    // for (let i = 0; i < users.length; i++) {
    //     //console.log('buscando ... id:' + users[i].id + ', param:' + param)
    //     if (param == users[i].id){
    //         users[i].name = req.body.name
    //         users[i].age = req.body.age
    //         break
    //     }
    // }
    // res.render('users', {users: users} )
}

const deleteUser = (req, res) => {
    const param = req.params.id
    const sql = `delete from users where id = ${param}`
    connection.query(sql, (err, result) => {
        if (err) {
            console.log('Error en consulta Update SQL' + err)
        } else {
            console.log('El registro se ha eliminado')
            res.redirect('/users/all')
        }
    })

    // for (let i = 0; i < users.length; i++) {
    //     if( param == users[i].id){
    //         users.splice(i,1)
    //         break
    //     }
    // }
    // res.render('users',{users: users})
}

module.exports = {getUsers, getCreateUser, getUpdateUser, getDeleteUser, createUser, updateUser, deleteUser}