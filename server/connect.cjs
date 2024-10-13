const { MongoClient } = require("mongodb")
require("dotenv").config({path: "./server/config.env"}) //access for dotenv library and to use config.env for environmental variables

const client = new MongoClient(process.env.ATLAS_URI);
let db;


async function connectDB(){

    const Db = process.env.ATLAS_URI;
    // to hold value of atlas uri string
    //now u can access environemtnal variables with process.env
    const client = new MongoClient(Db);

    //for smoothness added try and catch block

    try {

        //start of debug checking
        console.log("MongoDB URI:", process.env.ATLAS_URI);  //make sure we are connecting
        console.log("Connecting to MongoDB...");
        await client.connect();  //using await for promise chain (not instantaneous)
        console.log("Connected successfully!");

        db = client.db("Bagforjournalcontent"); // Set your database name

  
        
    } catch(e) {
        console.error(e)
        throw e;
    } 

}
module.exports = { connectDB, client }; // Export the connectDB function and client