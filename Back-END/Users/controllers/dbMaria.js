const mariadb = require('mariadb');

const pool = mariadb.createPool({
    host:'213.32.6.121',
    user:'root',
    password:'CESI-eats',
    database:'CESI_eats',
    connectionLimit: 10
})

module.exports = pool;