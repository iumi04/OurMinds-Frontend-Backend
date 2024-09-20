const { MongoClient } = require("mongodb")
require("dotenv").config({path: "./server/config.env"}) //access for dotenv library and to use config.env for environmental variables

async function main(){

    const Db = process.env.ATLAS_URI
    // to hold value of atlas uri string
    //now u can access environemtnal variables with process.env
    const client = new MongoClient(Db)

    //for smoothness added try and catch block
    try {

        //start of debug checking
        console.log("MongoDB URI:", process.env.ATLAS_URI);  //make sure we are connecting
        console.log("Connecting to MongoDB...");
        await client.connect();  //using await for promise chain (not instantaneous)
        console.log("Connected successfully!");
        //end of debug check

        //getting collections from database
        const collections = await client.db("App").listCollections().toArray();
        console.log("Collections fetched:", collections);

        //collections.forEach((collection) => console.log(collections.s.namespace.collections))
        //loops through every single collection in collection array


    } catch(e) {
        console.error(e)
    } finally {
        await client.close()
    }
    
}

main()