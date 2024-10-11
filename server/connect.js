const { MongoClient } = require("mongodb")
require("dotenv").config({path: "./server/config.env"}) //access for dotenv library and to use config.env for environmental variables



async function connectDB(){

    const Db = process.env.ATLAS_URI;
<<<<<<< Updated upstream:server/connect.js
    // to hold value of atlas uri string
    //now u can access environemntal variables with process.env
=======
>>>>>>> Stashed changes:server/connect.cjs
    const client = new MongoClient(Db);
    

    try {

        //start of debug checking
        console.log("Connecting to MongoDB...");
        await client.connect();  //using await for promise chain (not instantaneous)
        console.log("Connected successfully!");

<<<<<<< Updated upstream:server/connect.js
        // Return the connected client instead of closing it
        return client;
=======

>>>>>>> Stashed changes:server/connect.cjs

    } catch(e) {
        console.error("Error connecting to MongoDB:", e);
        throw e; // Rethrow the error to be handled by the caller
    }



}
module.exports = connectDB;
