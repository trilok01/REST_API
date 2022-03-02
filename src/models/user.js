const express = require('express');
const { default: mongoose } = require('mongoose');
const jwt = require('jsonwebtoken');

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
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    token: {
        type:String,
        required: true
    }
});

// Generating Tokens
userSchema.methods.generateAuthToken = async function() {
    try {
        const token = jwt.sign({
            _id: this._id,
            username: this.username
        }, "This is the secret key for authentication", { expiresIn: '30s' });
        this.token = token;
        await this.save();
    } catch(err) {
        res.send("The error part " + err);
        console.log("The error part " + err);
    }
}

// Creating a new Collection
const userCollection = new mongoose.model("User", userSchema);

// Exporting the Collection
module.exports = userCollection;