const express = require('express')
const router = express.Router()
const userController = require('../controllers/users')

// Ruta
router.get('/all', userController.getUsers)

router.get('/create', userController.getCreateUser)

router.get('/update/:id', userController.getUpdateUser)

router.get('/delete/:id', userController.getDeleteUser)

router.post('/create', userController.createUser)

// agregando el ":id" seteandolo como parametro de recepción y así buscaro
router.post('/delete/:id', userController.deleteUser)

// agregando el ":id" seteandolo como parametro de recepción y así buscaro
router.post('/update/:id', userController.updateUser)

module.exports = router