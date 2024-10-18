const { MongoClient } = require("mongodb")
require("dotenv").config({path: "./server/config.env"}) //access for dotenv library and to use config.env for environmental variables


async function connectDB(){

    const Db = process.env.ATLAS_URI;
    // to hold value of atlas uri string
    //now u can access environemntal variables with process.env
    const client = new MongoClient(Db);
    

    //for smoothness added try and catch block

    try {

        //start of debug checking
        console.log("Connecting to MongoDB...");
        await client.connect();  //using await for promise chain (not instantaneous)
        console.log("Connected successfully!");

        // Return the connected client instead of closing it
        return client;

    } catch(e) {
        console.error("Error connecting to MongoDB:", e);
        throw e; // Rethrow the error to be handled by the caller
    }

}
module.exports = connectDB;
