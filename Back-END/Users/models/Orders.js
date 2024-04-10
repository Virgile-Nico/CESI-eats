const mongoose = require('mongoose');
const { Schema } = mongoose;

var order = new Schema(
    {
        ID: String,
        ID_client: Number,
        ID_restaurant: Number,
        ID_delivery: Number,
        Total_price: Number,
        Number_products: Number,
        Status: String,
        Articles: Array,
        Menus: Array
    }
);
const Orders = mongoose.model('Orders', order);

var article = new Schema(
    {
        ID: Number,
        Nom: String,
        Description: String,
        Prix: Number
    }
);
const Article = mongoose.model('Articles', article);

var menu = new Schema(
    {
        ID: Number,
        Nom: String,
        Description: String,
        Prix: Number,
        Articles: Array
    }
);
const Menu = mongoose.model('Menus', menu);

module.exports = { Orders, Article, Menu };