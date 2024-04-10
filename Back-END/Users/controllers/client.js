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
    Order_create: async function (body) {
        const Identifier = createRandomString()
        console.log(Identifier)
        const newest = new Orders.Orders(
            {
                ID: Identifier,
                ID_client: body.ID_client,
                ID_restaurant: body.ID_restaurant,
                ID_delivery: body.ID_delivery,
                Total_price: body.Total_price,
                Number_products: body.Number_products,
                Status: body.Status,
                Articles: body.Articles,
                Menus: body.Menus
            }
        )
        console.log(newest);
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