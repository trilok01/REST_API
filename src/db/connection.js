const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/api_db", {

}).then(() => {
    console.log("Successfully connected to Database");
}).catch((e) => {
    console.log("Error Occurec while connecting to Database");
});