const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    Name: String,
    Quantity: Number,
    Description: String,
    Price: Number,
    _createdBy: Date
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;