const mariadb = require('mariadb');

const pool = mariadb.createPool({
    host:'213.32.6.121',
    use:'root',
    password:'CESI-eats',
    database:'User',
    connectionLimit: 10
})

module.exports = pool;