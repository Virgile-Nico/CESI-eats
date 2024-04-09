const mongoose = require('mongoose');
const pool = require('./dbMaria');

const Orders = require('../models/Orders')

function createRandomString() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < 5; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

module.exports = {
    //Create
    Order_create: async function () {
        const Identifier = createRandomString()
        console.log(Identifier)
        //const newest = new Orders.Orders({})
        //newest.save();
    },

    //read
    Order_read: async function () {

    },
    Order_history: async function () {

    },
    Account_read: async function () {

    },

    //Update
    Order_update: async function () {

    },
    Account_update: async function () {

    },

    //Delete
    Order_delete: async function () {

    },
    Account_delete: async function () {

    },

}