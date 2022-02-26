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
    tokens: [{
        token: {
            type:String,
            required: true
        }
    }]
});

// Generating Tokens
userSchema.methods.generateAuthToken = async function() {
    try {
        const token = jwt.sign({_id:this._id.toString()}, "this is the secret string needed for the authentication of this token");
        this.tokens = this.tokens.concat({token: token});
        await this.save();
        return token;
    } catch(err) {
        res.send("The error part " + err);
        console.log("The error part " + err);
    }
}

// Creating a new Collection
const userCollection = new mongoose.model("User", userSchema);

// Exporting the Collection
module.exports = userCollection;