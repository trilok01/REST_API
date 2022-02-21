const express = require('express');
require("../src/db/connection");
const userCollection = require("../src/models/user")

const app = express();
const PORT = process.env.PORT || 3000;

app.post("/user", async (req, res) => {
    try {
        //const createUser = new userCollection(req.body);
        console.log(req.body);
    }catch(e) {
        res.send(e);
    }
});

app.listen(PORT, () => {
    console.log(`Listening on port no ${PORT}`);
});