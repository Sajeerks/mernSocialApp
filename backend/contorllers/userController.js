const User = require("../models/UserModel.js");
const Post = require("../models/PostModel.js");
const { sendEmail } = require("../middleware/sendEmail.js");
const crypto = require("crypto");
const { post } = require("../routes/postRoutes.js");
const cloudinary = require("cloudinary")






exports.getUserPosts =async(req,res)=>{
  try {
      const user = await User.findById(req.params.id)
       const posts =[]
       for (let i = 0; i < user.posts.length; i++) {
            const post= await Post.findById(user.posts[i]).populate("likes comments.user owner")
            posts.push(post)
        
       }


   res.status(200 ).json({
    success:true,
    posts
   })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}






































exports.getMYposts =async(req,res)=>{
  try {
      const user = await User.findById(req.user._id)
       const posts =[]
       for (let i = 0; i < user.posts.length; i++) {
            const post= await Post.findById(user.posts[i]).populate("likes comments.user owner")
            posts.push(post)
        
       }


   res.status(200 ).json({
    success:true,
    posts
   })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}




exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      return res.status(500).json({
        success: false,
        message: "User already exists",
      });
    }
  
    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar,{
      folder:"avatars"
    })

    user = await User.create({
      name,
      email,
      password,
      avatar: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
    });

    const token = await user.generateToken();
    const options = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    res.status(201).cookie("token", token, options).json({
      success: true,
      user,
      message:"new user is created succesfully", 
      token,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password").populate("posts followers following");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "user does not exists",
      });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "email or password does not mathc",
      });
    }

    const token = await user.generateToken();
    const options = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    res.status(200).cookie("token", token, options).json({
      success: true,
      user,
      token,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.followUser = async (req, res) => {
  try {
    const userToFollow = await User.findById(req.params.id);

    const loggedInUser = await User.findById(req.user._id);

    if (!userToFollow) {
      res.status(404).json({
        success: false,
        message: "user not found",
      });
    }
    if (loggedInUser.following.includes(userToFollow._id)) {
      const index = loggedInUser.following.indexOf(userToFollow._id);
      loggedInUser.following.splice(index, 1);
      const index2 = userToFollow.followers.indexOf(loggedInUser._id);
      userToFollow.followers.splice(index2, 1);
      await loggedInUser.save();
      await userToFollow.save();
      res.status(200).json({
        success: true,
        message: "folowers deleted ",
      });
    } else {
      loggedInUser.following.push(userToFollow._id);
      userToFollow.followers.push(loggedInUser._id);
      await loggedInUser.save();
      await userToFollow.save();
      res.status(200).json({
        success: true,
        message: "folowers added ",
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.logout = async (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      })
      .json({
        success: true,
        message: "logout successfull ",
      });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updatePasword = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select("+password");
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "need old and new passweord",
      });
    }
    const isMatch = await user.matchPassword(oldPassword);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "incorret old password",
      });
    }
    user.password = newPassword;
    await user.save();
    res.status(200).json({
      success: true,
      message: "passord change added ",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    const { name, email } = req.body;
    if (name) user.name = name;
    if (email) user.email = email;


    await cloudinary.v2.uploader.destroy(user.avatar.public_id)

    
      if(req.body.avatar) {
        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar,{
          folder:"avatars"})
    
        //TODO avataer latere
    
          user.avatar.public_id = myCloud.public_id
          user.avatar.url = myCloud.secure_url
    

      }

 

    await user.save();
    res.status(200).json({
      success: true,
      message: "pofile change added ",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteMyProfile = async (req, res, next) => {
  try {
    const userID = req.user._id;
    const user = await User.findById(req.user._id);
    const posts = user.posts;
    const followers = user.followers;
    const followings = user.following;
   await cloudinary.v2.uploader.destroy(user.avatar.public_id)



    await user.deleteOne();

    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });

    for (let i = 0; i < posts.length; i++) {
      const post = await Post.findById(posts[i]);
      await cloudinary.v2.uploader.destroy(post.image.public_id)

      await post.deleteOne();
    }
    for (let i = 0; i < followers.length; i++) {
      const follower = await User.findById(followers[i]);
      const index = follower.following.indexOf(userID);
      follower.following.splice(index, 1);
      await follower.save();
    }

    ///removeing the following occe user is deleted
    for (let i = 0; i < followings.length; i++) {
      const following = await User.findById(followings[i]);
      const index = following.followers.indexOf(userID);
      following.followers.splice(index, 1);
      await following.save();
    }
   //remving all comments of use from all post 
 const allPosts = await User.find()


    for (let i = 0; i < allPosts.length; i++) {
        const post = await Post.findById(allPosts[i]._id)
              for (let j = 0; j <  post.comments.length; j++) {
                   if(post.comments[j].user === userID){
                     post.comments.splice(j,1)
                   }
              }
              await posts.save()
      
    }


    
    for (let i = 0; i < allPosts.length; i++) {
      const post = await Post.findById(allPosts[i]._id)
            for (let j = 0; j <  post.likes.length; j++) {
                 if(post.likes[j].user === userID){
                   post.likes.splice(j,1)
                 }
            }
            await posts.save()
    
  }








    res.status(200).json({
      success: true,
      message: `user with Id ${userID} is deleted successfully`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.MyProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).populate("posts followers following");

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};




exports.getAnyuserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).populate("posts followers following");

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    
    const users = await User.find(
      
      {
        name:{$regex:req.query.name, $options:"i"}
    
    }
      
      ).populate("posts");

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};





exports.forgotPassword = async (req, res, next) => {
   try {
     const user = await User.findOne({email:req.body.email})
 
     if(!user){
      res.status(404).json({
        success: false,
        message: "user not found ",
      });
   }
   const resetPasswordToken = await user.getPasswordRestToken()

   await user.save()
 const resetUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetPasswordToken}`
 const message = `Reset you password by clicking on the link below \n\n ${resetUrl}`
console.log(message);

   try {

   await sendEmail({email:user.email,message:message, subject:"reset Password" })

   res.status(200).json({
    success: true,
    message :`email send to ${user.email} successfully`,
  });
    
   } catch (error) {
       user.resetPasswordExpire = undefined
       user.resetPasswordToken = undefined

      await user.save()
      res.status(500).json({
        success: false,
        message: error.message,
      });
   }

  

   } catch (error) {
     res.status(500).json({
       success: false,
       message: error.message,
     });
   }
 };
 




 

exports.resetPassword = async (req, res, next) => {
  try {
     const resetPasswordToken  = crypto.createHash("sha256").update(req.params.token).digest("hex")
     console.log({resetPasswordToken})
       const user  =await User.findOne({resetPasswordToken,
      
       resetPasswordExpire:{$gt:Date.now()}} ).select("+password")
      //  console.log({user})
       if(!user){
        console.log("nod use found")
        return res.status(401).json({
          success:false,
          message:"Token is invalid or expired"
        })
       }
       
       user.password = req.body.password 
       user.resetPasswordExpire = undefined
       user.resetPasswordToken = undefined
       await user.save()

      res.status(200).json({
        success:true,
        message: `password for ${user.name} was updated succesfully`
      })
 
   
  } catch (error) {
    res.status(500).json({
      success:false,
      message:error.message
    })
  }
};
