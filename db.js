const mysql = require("mysql")
require("dotenv").config()

const pool = mysql.createPool({
    connectionLimit: process.env.connectionLimit,
    host:process.env.host,
    user:process.env.user,
    database: process.env.database,
    password:process.env.password,
    port:process.env.port
})

const connectDb = async () => {
    await pool.getConnection ( async (err, connection) => {
        if (err) throw err
    })

    

}
module.exports = {pool, connectDb};