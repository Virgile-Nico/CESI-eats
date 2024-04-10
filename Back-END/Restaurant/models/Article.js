const mongoose = require('mongoose');
const { Schema } = mongoose;

var article = new Schema(
    {
        ID: Number,
        Nom: String,
        Description: String,
        Prix: Number
    }
);
const Article = mongoose.model('Articles', article);


module.exports = { Article };