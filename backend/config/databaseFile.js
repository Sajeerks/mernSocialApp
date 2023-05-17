const mongoose = require("mongoose")
const { MongoClient } = require("mongodb");
// const { MongoClient, ServerApiVersion } = require('mongodb')

// //  exports.connectToDatabase2 = async()=>{
// //     try {
// //         const {connection}  = await mongoose.connect(process.env.MONGO_URI)

// //         console.log(connection.host);
// //     } catch (error) {
// //         console.log(error);
        
// //     }
   
// // }

// const uri  = process.env.MONGO_URI 

// const client = new MongoClient(uri, {
//     serverApi: {
//       version: ServerApiVersion.v1,
//       strict: true,
//       deprecationErrors: true,
//     }
//   });



//   async function run() {
//     try {
//       // Connect the client to the server	(optional starting in v4.7)
//       await client.connect();
//       console.log("ccccccccccccccccccccccccccccccccccccc")
//       // Send a ping to confirm a successful connection
//       await client.db("admin").command({ ping: 1 });
//       console.log("Pinged your deployment. You successfully connected to MongoDB!");
//     } finally {
//       // Ensures that the client will close when you finish/error
//       await client.close();
//     }
//   }



// Replace the uri string with your connection string.
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);
async function run() {
  try {
    console.log("rrrrrrrrr")
    client.connect((con)=>{
      console.log("connected")
      console.log(`Database connected to ${con} `)
    })
       
    // const database = client.db('sample_mflix');
    // const movies = database.collection('movies');
    // // Query for a movie that has the title 'Back to the Future'
    // const query = { title: 'Back to the Future' };
    // const movie = await movies.findOne(query);
    // console.log(movie);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
// run().catch(console.dir);







  

exports.connectToDatabase = async ()=>{
    mongoose.connect(process.env.MONGO_URI).then((con)=>{
        console.log(`Database connected to ${con.connection.host} `)
    }).catch((error)=>{
        console.log(error);
    })

    // await run().catch(console.dir);

    // run().catch(console.dir);
//   run()
}




