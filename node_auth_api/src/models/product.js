const express = require('express');
const { default: mongoose } = require('mongoose');

// Defining the Product Schema
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    _createdBy: {
        type: String,
        required: true,
        default: "Trilok"
    }
});

// Creating a new Collection
const productCollection = new mongoose.model("Product", productSchema);

// Exporting the Collection
module.exports = productCollection;