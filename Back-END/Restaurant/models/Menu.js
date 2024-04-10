const mongoose = require('mongoose');
const { Schema } = mongoose;

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


module.exports = { Menu };