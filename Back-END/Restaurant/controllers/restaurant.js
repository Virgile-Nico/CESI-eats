const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
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
    Article_create: async function (Identifier, body) {
        const newest = new Article.Article({ID: Identifier, Nom: body.Nom, Description: body.Description, Prix: body.Prix})
        newest.save();
    },
    Menu_create: async function (Identifier, body) {
        const newest = new Menu.Menu({ ID: Identifier,  Nom: body.Nom, Description: body.Description, Prix: body.Prix, Articles: body.Articles })
        newest.save();
    },

    Account_read: async function (ID) {
        const request = `SELECT * FROM RESTAURANT WHERE ID=${ID}`
        let response = await pool.query(request);
        return response[0];
    },
    Hours_read: async function (Identifier) {
        let response = await Account.Hours.find({ID:Identifier})
        const list_to_return = []
        response.map((element) => {
            let obj = {
                _id: element._id,
                Day: element.Day,
                Open: element.Open,
                Close: element.Close
            }
            list_to_return.push(obj)
        });
        return list_to_return
    },
    Article_read: async function (Identifier) {
        let response = await Article.Article.find({ ID: Identifier })
        const list_to_return = []
        response.map((element) => {
            let obj = {
                _id: element._id,
                Nom: element.Nom,
                Description: element.Description,
                Prix: element.Prix
            }
            list_to_return.push(obj)
        });
        return list_to_return
    },
    
    Menu_read: async function (Identifier) {
        let response = await Menu.Menu.find({ ID: Identifier })
        const list_to_return = []
        await Promise.all(response.map(async (element) => {
            let articles_list = []
            
            await Promise.all(element.Articles.map(async (article) => {
                articles_list.push(await this.Article_menu_read(article))
            }));

            let obj = {
                _id: element.id,
                Nom: element.Nom,
                Description: element.Description,
                Prix: element.Prix,
                Articles: articles_list
            }
            list_to_return.push(obj)
        }))
        return list_to_return
    },
    Menu_read: async function (Identifier) {
        let response = await Menu.Menu.find({ _id: Identifier })
        const list_to_return = []
        await Promise.all(response.map(async (element) => {
            let articles_list = []
            
            await Promise.all(element.Articles.map(async (article) => {
                articles_list.push(await this.Article_menu_read(article))
            }));

            let obj = {
                _id: element.id,
                Nom: element.Nom,
                Description: element.Description,
                Prix: element.Prix,
                Articles: articles_list
            }
            list_to_return.push(obj)
        }))
        return list_to_return
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
        const mail = body.MAIL;
        const password = bcrypt.hashSync(body.PASSWORD, 10);
        const name = body.NOM;
        const phone = body.TEL;
        const CP = body.CP;
        const City = body.VILLE;
        const Adress = body.ADRESSE;
        const SIRET = body.SIRET;
        const RIB = body.RIB;

        const request = `UPDATE RESTAURANT SET MAIL = '${mail}', PASSWORD = '${password}', NOM = '${name}', TEL = '${phone}', CP = ${CP}, VILLE = '${City}', ADRESSE = '${Adress}', SIRET = '${SIRET}', RIB = '${RIB}' WHERE ID = ${ID};`
        
        pool.query(request);
    },
    Categories_update: async function (Identifier, categories) {
        const cat_request = `SELECT * FROM CATEGORIES;`
        let name = await pool.query(cat_request)
        let categories_to_send = []

        categories.forEach(cat => {
            categories_to_send.push(name.find((element) => element.NOM == cat).ID)            
        });

        await Account.Categories.findOneAndUpdate({ID: Identifier}, { categories: categories_to_send})
    },
    Hours_update: async function (Identifier, body) {
        await Account.Hours.findByIdAndUpdate(Identifier, { Day: body.Day, Open: body.Open, Close: body.Close })
    },
    Article_update: async function (Identifier, body) {
        await Article.Article.findByIdAndUpdate(Identifier, { Nom: body.Nom, Description: body.Description, Prix: body.Prix })
    },
    Menu_update: async function (Identifier, body) {
        await Menu.Menu.findByIdAndUpdate(Identifier, { Nom: body.Nom, Description: body.Description, Prix: body.Prix, Articles: body.Articles })
    },
    Account_delete: async function (Identifier) {
        await Menu.Menu.deleteMany({ID: Identifier})
        await Article.Article.deleteMany({ID: Identifier})
        await Account.Hours.deleteMany({ID: Identifier})
        await Account.Categories.deleteMany({ID: Identifier})

        const delete_query = `DELETE FROM RESTAURANT WHERE ID = ${Identifier}`
        await pool.query(delete_query)

    },
    Hours_delete: async function (Identifier) {
        await Account.Hours.deleteOne({_id:Identifier})
    },
    Categories_delete: async function (Identifier) {
        await Account.Categories.deleteOne({ _id: Identifier })
    },
    Article_delete: async function (Identifier) {
        await Article.Article.deleteOne({ _id: Identifier})
    },
    Menu_delete: async function (Identifier) {
        await Menu.Menu.deleteOne({ _id: Identifier })
    },

    Articles_order_read : async function (Article_obj){
        let article = await Article.Article.findById(Article_obj.ID)
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
        let article = await Article.Article.findById(Identifier)
        let obj = {
            _id: article._id,
            Nom: article.Nom,
            Description: article.Description,
            Prix: article.Prix
        }
        return obj
    },
    Menus_order_read : async function (Menu_obj){
        let menu = await Menu.Menu.findById(Menu_obj.ID)
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
        
        let result = await Order.Orders.findById(Identifier)
        if(result.Status == 'confirmed' || result.Status == 'paid' || result.Status == 'in preparation' || result.Status ==  "in mouvement" || result.Status ==  "Done"){
            const SQL_query = `SELECT NOM, PRENOM from CLIENTS WHERE ID=${result.ID_client}`
            let client_name = await pool.query(SQL_query)
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
                Date_Creation : result._id.getTimestamp(),
                ID : result.ID,
                nom_client : `${client_name[0].NOM} ${client_name[0].PRENOM}`,
                Total_price : result.Total_price,
                Number_products : result.Number_products,
                Articles : articles_list,
                Menus : menus_list
            }
            return obj
        }
        else{
            return null
        }
    },
    Order_history: async function (Identifier) {
        let result = await Order.Orders.find( { ID_restaurant: Identifier })
        let obj_to_return = []
        await Promise.all(result.map( async (order) => {
            if(order.Status == 'confirmed' || order.Status == 'paid' || order.Status == 'in preparation' || order.Status ==  "in mouvement" || order.Status ==  "Done"){
                const SQL_query = `SELECT NOM, PRENOM from CLIENTS WHERE ID=${order.ID_client}`
                let client_name = await pool.query(SQL_query)
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
                    Date_Creation : order._id.getTimestamp(),
                    ID : order.ID,
                    nom_client : `${client_name[0].NOM} ${client_name[0].PRENOM}`,
                    Total_price : order.Total_price,
                    Status: order.Status,
                    Number_products : order.Number_products,
                    Articles : articles_list,
                    Menus : menus_list
                }
                obj_to_return.push(obj)
            }
        }))
        return obj_to_return
    },

    Order_update: async function (Identifier) {
        const ID= Identifier
        await Order.Orders.findByIdAndUpdate(ID, { Status: "In preparation"})
    },
}
