const express = require('express');
require("../src/db/connection");
const userCollection = require("../src/models/user");
const productCollection = require("../src/models/product");
const CSVToJSON = require('csvtojson');
const multer = require('multer');
const uploads = multer({});
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.use(express.urlencoded());

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

// Fetch users list
app.get("/userlist", async (req, res) => {
    try{
        const userList = await userCollection.find({}, {_id: 0, firstName: 1, lastName: 1});
        res.send(userList);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Add product
app.post("/addproduct", uploads.single("file"), (req, res) => {
    let str = (req.file.buffer.toString());
    var productList;
    CSVToJSON().fromString (str).then((jsonObj) => {
        productList = jsonObj;
    }).then(() => {
        try {
            productCollection.insertMany(productList).then(() => {
                res.status(200).send({"message": "Inserted Successfully"});
            }).catch((err) => {
                res.status(422).send({"message": err.message});
            });
        }catch(err) {
            res.status(409).send(err);
        }
    });
});

app.listen(PORT, () => {
    console.log(`Listening on port no ${PORT}`);
});