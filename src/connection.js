const mysql = require('mysql')
const { mysql_database } = require('./config')

const connection = mysql.createConnection(mysql_database)

connection.connect((err, conn) => {
    if (err) {
        console.log(err)
        console.log('Ha ocurrido un error y no se pudo conectar')
    } else {
        console.log('Conexión exitosa')
        return conn
    }
})

module.exports = connection