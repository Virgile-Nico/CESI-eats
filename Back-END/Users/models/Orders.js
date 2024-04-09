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
        Articles: Array
    }
);
const Orders = mongoose.model('Orders', order);

module.exports = { Orders };