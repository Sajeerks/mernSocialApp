const app =require("./app.js");
const { connectToDatabase } = require("./config/databaseFile.js");
const cloudinary = require("cloudinary")


connectToDatabase()


cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME  , 
    api_key:process.env.CLUDINARY_KEY,
    api_secret :process.env.CLOUDINARY_API_SECRET,
  })



app.listen(process.env.PORT, ()=>{
    console.log(`app running on ${process.env.PORT}`);
  


})

