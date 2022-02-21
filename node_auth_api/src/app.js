debugger;
const express = require('express');
require("../src/db/connection");
const userCollection = require("../src/models/user");
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello from the server");
});

// Creating new User
app.post("/signup", async (req, res) => {
    try {
        const createUser = new userCollection(req.body);

        // Create a Token
        const token = await createUser.generateAuthToken();

        // Insert user into DB
        const insertUser = await createUser.save();
        res.status(201).send(insertUser);
    }catch(err) {
        res.status(409).send(err);
    }
});

// Logging in
app.post("/login", async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
        const user = await userCollection.findOne({username: username, password: password});
        
        if(user) {
            res.send(user);
        } else {
            res.status(401).send("Incorrect User Name or Password");
        }
    } catch(err) {
        res.status(400).send(err);
    }
});

app.get("/userlist", async (req, res) => {
    try{
        const userList = await userCollection.find({}, { projections: {_id: 1, firstName: 1}});
        console.log(userList);
    } catch (err) {
        res.status(400).send(err);
    }
});

app.listen(PORT, () => {
    console.log(`Listening on port no ${PORT}`);
});