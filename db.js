const mongoose = require("mongoose");
require("dotenv").config();

const Connection_Url= process.env.MONGO_DB_CONNECTION_URL;

function connectToDb(){
    mongoose.connect(Connection_Url);
    mongoose.connection.on("connected", () => {
        console.log("Connected to MongoDB Successfully");
    });

    mongoose.connection.on("error", (err) => {
        console.log("An error occurred while connecting to MongoDB");
        console.log(err);
    });
}


module.exports = {
    connectToDb
};