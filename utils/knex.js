'use strict'

const knex = module.exports = require('knex')({
    client: 'mysql',
    connection: {
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASS,
        port: process.env.MYSQL_PORT,
        database: process.env.MYSQL_DB,
        charset: 'utf8',
    },
    pool: {
        min: 2,
        max: 10
    }
})

module.exports = knex