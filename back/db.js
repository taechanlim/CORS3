require('dotenv').config()
const mysql = require('mysql2')
// npm install mysql2

const host = process.env.DB_HOST || 'localhost'
const user = process.env.DB_USER || 'taechan'
const password = process.env.DB_PASSWORD || '9688'
const database = process.env.DB_DATABASE || 'home'


const config = {host,user,password,database}
const pool = mysql.createPool(config)
const promisePool = pool.promise()
exports.pool = promisePool