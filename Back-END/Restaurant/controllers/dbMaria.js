const mariadb = require('mariadb');

const pool = mariadb.createPool({
    host:'213.32.6.121',
    user:'root',
    password:'CESI-eats',
    database:'Restaurants',
    connectionLimit: 100
})

module.exports = pool;