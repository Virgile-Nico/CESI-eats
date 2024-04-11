const mongoose = require('mongoose');
const pool = require('./dbMaria');

const Orders = require('../models/Orders')
const Clients = require('../models/Client')

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
    Order_create: async function (body, Identifier) {
        const Order_Identifier = createRandomString()
        const newest = new Orders.Orders(
            {
                ID: Order_Identifier,
                ID_client: Identifier,
                ID_restaurant: body.ID_restaurant,
                ID_delivery: body.ID_delivery,
                Total_price: body.Total_price,
                Number_products: body.Number_products,
                Status: body.Status,
                Articles: body.Articles,
                Menus: body.Menus
            }
        )
        newest.save();
    },
    Address_create: async function (body, Identifier) {
        const newest = new Clients.Adress({ID: Identifier, CP:body.CP, City: body.City, Street: body.Street})
        newest.save()
    },
    Card_create: async function (body, Identifier) {
        const newest = new Clients.Card({ID: Identifier, Card_number: body.Card_number, Owner: body.Owner, CVC: body.cvc, Expiration_date: body.Exp_date})
        newest.save()
    },

    //read
    Articles_order_read : async function (Article_obj){
        let article = await Orders.Article.findById(Article_obj.ID)
        let obj = {
            _id: article._id,
            Nom: article.Nom,
            Description: article.Description,
            Prix: article.Prix,
            Qte: Article_obj.Qte
        }
        return obj
    },
    Article_menu_read: async function (Identifier) {
        let article = await Orders.Article.findById(Identifier)
        let obj = {
            _id: article._id,
            Nom: article.Nom,
            Description: article.Description
        }
        return obj
    },
    Menus_order_read : async function (Menu_obj){
        let menu = await Orders.Menu.findById(Menu_obj.ID)
        let articles_list = []
        await Promise.all(menu.Articles.map(async (article) => {
            articles_list.push(await this.Article_menu_read(article))
        }))
        let obj = {
            _id: menu._id,
            Nom: menu.Nom,
            Description: menu.Description,
            Prix: menu.Prix,
            Articles: articles_list,
            Qte: Menu_obj.Qte
        }
        return obj
    },
    Order_read: async function (Identifier) {
        let result = await Orders.Orders.findById(Identifier)

        const SQL_query = `SELECT NOM from RESTAURANT WHERE ID=${result.ID_restaurant}`
            let restaurant_name = await pool.query(SQL_query)
            let articles_list = []
            let menus_list = []
            
            await Promise.all(await result.Articles.map(async (article) => {
                articles_list.push(await this.Articles_order_read(article))
            }))
            await Promise.all(await result.Menus.map(async (menu) => {
                menus_list.push(await this.Menus_order_read(menu))
            }))

            let obj = {
                _id : result._id,
                ID : result.ID,
                nom_restaurant : restaurant_name[0].NOM,
                Total_price : result.Total_price,
                Number_products : result.Number_products,
                Articles : articles_list,
                Menus : menus_list
            }


        return obj
    },
    Order_history: async function (Identifier) {
        let result = await Orders.Orders.find( { ID_client: Identifier })
        let obj_to_return = []
        await Promise.all(result.map( async (order) => {
            const SQL_query = `SELECT NOM from RESTAURANT WHERE ID=${order.ID_restaurant}`
            let restaurant_name = await pool.query(SQL_query)
            let articles_list = []
            let menus_list = []
            
            await Promise.all(await order.Articles.map(async (article) => {
                articles_list.push(await this.Articles_order_read(article))
            }))
            await Promise.all(await order.Menus.map(async (menu) => {
                menus_list.push(await this.Menus_order_read(menu))
            }))

            let obj = {
                _id : order._id,
                ID : order.ID,
                nom_restaurant : restaurant_name[0].NOM,
                Total_price : order.Total_price,
                Number_products : order.Number_products,
                Articles : articles_list,
                Menus : menus_list
            }
            obj_to_return.push(obj)
        }))
        return obj_to_return
    },
    Address_read: async function (Identifier) {
        let response = await Clients.Adress.findOne({ _id: Identifier })
        return response
    },
    Address_client_read: async function (Identifier) {
        let response = await Clients.Adress.find({ID: Identifier})
        return response
    },
    Card_read: async function (Identifier) {
        let response = await Clients.Card.findOne({ _id: Identifier })
        return response
    },
    Card_client_read: async function (Identifier) {
        let response = await Clients.Card.find({ID: Identifier})
        return response
    },
    Account_read: async function (Identifier) {
        let SQL_slate = `SELECT MAIL, NOM, PRENOM, TEL, CODE_PARAINAGE FROM CLIENTS WHERE ID=${Identifier}`
        let account = await pool.query(SQL_slate)
        return account[0]
    },

    //Update
    Order_update: async function (body, Identifier) {
        const ID= Identifier
        const Total_price= body.Total_price
        const Number_products= body.Number_products
        const Status= body.Status
        const Articles= body.Articles
        const Menus= body.Menus

        await Orders.Orders.findByIdAndUpdate(ID, {Total_price: Total_price, Number_products: Number_products, Status: Status, Articles: Articles, Menus: Menus})
    },
    Address_update: async function (body, Identifier) {
        await Clients.Adress.findByIdAndUpdate(Identifier, {CP:body.CP, City: body.City, Street: body.Street})
    },
    Card_update: async function (body, Identifier) {
        await Clients.Card.findByIdAndUpdate(Identifier, {Card_number: body.Card_number, Owner: body.Owner, CVC: body.cvc, Expiration_date: body.Exp_date})
    },
    Account_update: async function (body, Identifier) {
        let SQL_slate = `UPDATE CLIENTS SET MAIL = ${body.MAIL} NOM = ${body.NOM} PRENOM = ${body.PRENOM} TEL = ${body.TEL} WHERE ID=${Identifier}`
        await pool.query(SQL_slate)
    },

    //Delete
    Order_delete: async function (Identifier) {
        await Orders.Orders.deleteOne({_id: Identifier})
    },
    Address_delete: async function (Identifier) {
        await Clients.Adress.deleteOne({_id: Identifier})
    },
    Card_delete: async function (Identifier) {
        await Clients.Card.deleteOne({_id: Identifier})
    },
    Account_delete: async function (Identifier) {
        let orders = await Orders.Orders.find({Status: "cart", ID_client: Identifier})
        orders.forEach(async (order) => {
            await this.Order_delete(order._id)
        });
        await Clients.Card.deleteMany({ID: Identifier})
        await Clients.Adress.deleteMany({ID: Identifier})

        let SQL_slate = `DELETE FROM CLIENTS WHERE ID = ${Identifier}`
        await pool.query(SQL_slate)
    }
}