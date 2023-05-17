const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")

const userSchema = new mongoose.Schema({
    name:{
        type:String, 
        required:[true, "pleae enter ur name"]
    },
    email:{
        type:String,
        required:[true, "pleae enter ur email"],
        unique:[true, "emial alerady exists"]

    },
    password:{
        type:String, 
        required:[true, "pleae enter ur password"], 
        minLength :[6, "plese enter a password greater than 6 digits in length"],
        select:false
    },

   posts:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post"
    }
   ],
   followers:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
]
    ,
    following:[

        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }

    ]
    ,
    avatar:{
        public_id:String, 
        url:String
    },
    resetPasswordToken :String,
    resetPasswordExpire :String,

   


    
}





)

userSchema.pre("save" , async function(next){

    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 10)
    }
    next()

})

userSchema.methods.matchPassword =async function(password){
   return await bcrypt.compare(password, this.password)
}
userSchema.methods.generateToken = function(){
    return jwt.sign({_id:this._id}, process.env.JWT_SECRET)
}
userSchema.methods.getPasswordRestToken = function(){
const resetToken = crypto.randomBytes(20).toString("hex")
  this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex")
  this.resetPasswordExpire = Date.now()+10*60*1000

  return resetToken
}




module.exports = mongoose.model("User", userSchema)