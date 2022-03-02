const express = require('express');
require("../src/db/connection");
const userCollection = require("../src/models/user");
const productCollection = require("../src/models/product");
const CSVToJSON = require('csvtojson');
const multer = require('multer');
const uploads = multer({});
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

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
        await createUser.generateAuthToken();

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
        const user = await userCollection.findOne({username: username, password: password}, {password: 0});
        if(user) {
            const token = jwt.sign({
                _id: user._id,
                username: user.username
            }, "This is the secret key for authentication", { expiresIn: '300s' });

            res.status(200).send({auth: true, token: token});

        } else {
            res.status(401).send("Incorrect User Name or Password");
        }
    } catch(err) {
        res.status(400).send("" + err);
    }
});



// Fetch users list
app.get("/userlist", verifyToken, async (req, res) => {
    try{
        const userList = await userCollection.find({}, {_id: 0, firstName: 1, lastName: 1});
        res.send(userList);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Add product
app.post("/addproduct", verifyToken, uploads.single("file"), (req, res) => {
    let str = (req.file.buffer.toString());
    var productList;
    CSVToJSON().fromString (str).then((jsonObj) => {
        productList = jsonObj;
    }).then(() => {
        try {
            for(var i = 0; i < productList.length; i++) {
                productList[i]._createdBy = req.username;
            }

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

function verifyToken(req, res, next) {
    var token = req.headers['x-access-token'];
    if(!token) return res.status(401).send({auth: false, message: 'No token provided'});

    jwt.verify(token, "This is the secret key for authentication", (err, decoded) => {
        if(err) return res.status(500).send({auth: false, message: 'Failed to authenticate token.'});

        req.username = decoded.username;
        next();
    });
}

app.listen(PORT, () => {
    console.log(`Listening on port no ${PORT}`);
});