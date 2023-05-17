const express = require("express")
const cookieParser  = require("cookie-parser")
const path = require("path")
// const dotEnv = require("dotenv")

// dotEnv.config({
//     path:"backend/config/config.env"
// })


if(process.env.NODE_ENV!=="production"){
    require("dotenv").config({
        path:"backend/config/config.env"
    })
}

const app = express()
//usign middleware
app.use(express.json({limit:"50mb"}))
app.use(express.urlencoded({limit:"50mb",extended:true}))
app.use(cookieParser())



const post = require("./routes/postRoutes.js")
const user = require("./routes/userRoutes.js")


app.use("/api/v1",post)
app.use("/api/v1",user)

app.use(express.static(path.join(__dirname, "../frontend/build")))
app.get("*", (req, res)=>{
    res.sendFile(path.resolve(__dirname,"../frontend/build/index.html"))
})



module.exports = app