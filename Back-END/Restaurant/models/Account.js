const mongoose = require('mongoose');
const { Schema } = mongoose;

var categories = new Schema(
    {
        ID: Number,
        categories: Array
    }
);
const Categories = mongoose.model('Categories', categories);

var hours = new Schema(
    {
        ID: Number,
        Day: String,
        Open: String,
        Close: String
    }
)
const Hours = mongoose.model('Hours', hours);

module.exports = { Categories, Hours };