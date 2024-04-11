const mongoose = require('mongoose');
const { Schema } = mongoose;

var categories = new Schema(
    {
        ID: Number,
        categories: Array
    }
);
const Categories = mongoose.model('Categories', categories);

module.exports = Categories