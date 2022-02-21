const express = require('express');
const { default: mongoose } = require('mongoose');

// Defining the User Schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// Creating a new Collection
const userCollection = new mongoose.model("User", userSchema);

// Exporting the Collection
module.exports = userCollection;