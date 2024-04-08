const mongoose = require('mongoose');
const Account = require('../models/Account');
const Article = require('../models/Article');
const Menu = require('../models/Menu');
const Order = require('../models/Orders')
const pool = require('../controllers/dbMaria');
const { response } = require('express');

module.exports = {
    Hours_create: async function (Identifier, day, open, close) {
        const newest = new Account.Hours({ID: Identifier, Day: day, Open: open, Close: close})
        newest.save();
    },
    Article_create: async function (ID) {

    },
    Menu_create: async function (ID) {

    },

    Account_read: async function (ID) {
        const request = `SELECT * FROM RESTAURANT WHERE ID=${ID}`
        let response = await pool.query(request).then(console.log(`Promise ready`));
        return response[0];
    },
    Hours_read: async function (ID) {

    },
    Article_read: async function (ID) {

    },
    Menu_read: async function (ID) {

    },
    Categories_read: async function (Identifier) {
        let response = await Account.Categories.findOne({ ID: Identifier})
        let categories_to_send = []
        const cat_request = `SELECT * FROM CATEGORIES;`
        let name = await pool.query(cat_request)
        response.categories.forEach(cat => {
            categories_to_send.push(name.find((element) => element.ID == cat).NOM)
        })
        return categories_to_send
    },

    Account_update: async function (ID, body) {
        const mail = body.mail;
        const password = body.password;
        const name = body.name;
        const phone = body.phone;
        const CP = body.CP;
        const City = body.City;
        const Adress = body.Adress;
        const SIRET = body.Siret;
        const RIB = body.RIB;

        const request = `UPDATE RESTAURANT SET MAIL = '${mail}', PASSWORD = '${password}', NOM = '${name}', TEL = '${phone}', CP = ${CP}, VILLE = '${City}', ADRESSE = '${Adress}', SIRET = '${SIRET}', RIB = '${RIB}' WHERE ID = ${ID};`
        pool.query(request);
    },
    Hours_update: async function (ID, body) {

    },
    Article_update: async function (ID, body) {

    },
    Menu_update: async function (ID, body) {

    },
}