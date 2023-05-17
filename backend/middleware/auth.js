const jwt = require("jsonwebtoken")
const User = require("../models/UserModel.js")

exports.isAuthenticated =async(req, res ,next)=>{


    try {
        const {token} = req.cookies

    if(!token){
        return res.status(400 ).json({
            success:false,
            message:"Please login first"
        })
    }

      const docoded_ID = jwt.verify(token,process.env.JWT_SECRET )
      req.user = await User.findById(docoded_ID)


      next()
    } catch (error) {
        res.status(400).json({
            success:false,
            messaage:error.message
         })
    }
    

}