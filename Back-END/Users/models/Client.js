const mongoose = require('mongoose');
const { Schema } = mongoose;

var adress = new Schema(
    {
        ID: Number,
        CP: Number,
        City: String,
        Street: String

    }
);
const Adress = mongoose.model('Clients_adresses', adress);

var card = new Schema(
    {
        ID: Number,
        Card_number : Number,
        Owner: String,
        CVC: Number,
        Expiration_date: String

    }
);
const Card = mongoose.model('Clients_cards', card);


module.exports = { Adress, Card };