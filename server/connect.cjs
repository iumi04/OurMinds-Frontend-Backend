const { MongoClient } = require("mongodb")
require("dotenv").config({path: "./config.env"}) //access for dotenv library and to use config.env for environmental variables

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
        await client.connect();
        console.log("Connected successfully!");
        //end of debug check

        //getting collections from database
        const collections = await client.db("App").listCollections().toArray();
        console.log("Collections fetched:", collections);
        await client.connect()         //connects to client now

         //needs await keyword bc its not instantanious
        collections.forEach((collection) => console.log(collection.s.namespace.collection))
        //loops through every single collection in collection array


    } catch(e) {
        console.error(e)
    } finally {
        await client.close()
    }
    
}

main()