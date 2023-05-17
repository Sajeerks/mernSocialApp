const Post = require("../models/PostModel");
const User = require("../models/UserModel.js");
const cloudinary = require("cloudinary")

exports.createPost = async (req, res, next) => {
  try {
  
const myCloud = await cloudinary.v2.uploader.upload(req.body.image,{
  folder:"posts"
})

    const newPostData = {
      caption: req.body.caption,

      image: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
      owner: req.user._id,
    };
    const newPost = await Post.create(newPostData);
    const user = await User.findById(req.user._id);
    user.posts.unshift(newPost._id);
    await user.save();
    res.status(201).json({
      success: true,
      message: "Post created",
      // post: newPost,
    });
  } catch (error) {
    console.log(error);

    res.status(400).json({
      success: false,
      message: "error  is found ",
    });
  }
};


exports.likeAndUnlikePost = async (req, res, next) => {
try {
   const post = await Post.findById(req.params.id)


  if(!post){
    
    res.status(404).json({
      success: false,
      message: "post not found ",
    });
  }




   if(post.likes.includes(req.user._id)){
    const index = post.likes.indexOf(req.user._id)
    post.likes.splice(index, 1)
    await post.save()

    res.status(201).json({
      success: true,
      message:"post disliked",
    });
   }else{
    post.likes.push(req.user._id)

    await post.save()

    res.status(200).json({
      success: true,
      message:"post liked",
    });
   }

   
} catch (error) {
  console.log(error);

    res.status(400).json({
      success: false,
      message: "error  is found ",
    });
}


}




exports.deletePost = async (req, res, next) => {
  try {
     const post = await Post.findById(req.params.id)
  
  
    if(!post){
      
      res.status(404).json({
        success: false,
        message: "post not found ",
      });
    }
    if(post.owner.toString() !== req.user.id.toString()){
      res.status(401).json({
        success: false,
        message: "unAuthorized to delete ",
      });
    }else{
       await cloudinary.v2.uploader.destroy( post.image.public_id)

      await post.deleteOne()


      const user  = await User.findById(req.user._id)
      const index = user.posts.indexOf(req.params.id)
        user.posts.splice(index,1)
     await user.save()
  
      res.status(200).json({
        success: true,
        message:"post delted wit id " + req.params.id,
      });
    
    }

   
  
     
  } catch (error) {
    console.log(error);
  
      res.status(400).json({
        success: false,
        message: "error  is found ",
      });
  }
  
  
  }


  exports.getPostsOfFollowing =async(req,res, next)=>{


      try {
        //  const user = await User.findById(req.user._id).populate("following","posts")
         const user = await User.findById(req.user._id)
         const posts = await Post.find({
          owner:{
            $in:user.following
          },
         }).populate("owner likes comments.user")
    

           res.status(200).json({
            success:true,
            posts:posts.reverse()
          //  following: user.following
           })
        
      } catch (error) {
        res.status(500).json({
          success: false,
          message: error.message,
        });
      }
  }




  exports.updateCaption =async(req,res, next)=>{
try {
    const post = await Post.findById(req.params.id)
    if(!post){
      res.status(404).json({
        success: false,
        message: "post not found ",
      });
    }

    if(post.owner.toString() !== req.user._id.toString()){
      res.status(404).json({
        success: false,
        message: "un authorised ",
      });
    }

    post.caption = req.body.caption  
    await post.save()

    res.status(200).json({
      success:true,
      message: "post upaated ",
    //  following: user.following
     })

} catch (error) {
  res.status(500).json({
    success: false,
    message: error.message,
  });
}





  }



  exports.addComment =async(req,res, next)=>{
    try {
        const post = await Post.findById(req.params.id)
        if(!post){
          res.status(404).json({
            success: false,
            message: "post not found ",
          });
        }

let commentExists= -1
post.comments.forEach((item, index)=>{
  if(item.user.toString()  === req.user._id.toString()){
    commentExists= index
  }

})
        if(commentExists !== -1){
           post.comments[commentExists].comment = req.body.comment
     
     

        }else{
          post.comments.push({
            user:req.user._id,
            comment:req.body.comment
           })
          
        }


    

        await post.save()
    
        res.status(200).json({
          success:true,
          message: "comment upaated ",
    
         })
    
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
    
    
    
    
    
      }




      

  exports.deleteComment =async(req,res, next)=>{
    try {
        const post = await Post.findById(req.params.id)
        if(!post){
          res.status(404).json({
            success: false,
            message: "post not found ",
          });
        }
  // console.log("beforrrrrrrrrrrrrr")
  //       console.log(req.body.commentId)
  //       console.log(req.body)
        


   // checking if you are the owener u want to delete

        if(post.owner.toString() === req.user._id.toString()){
   if(req.body.commentId === undefined){
    

    // console.log("afterrrrrrrrrrrrr if")

    console.log(req.body.commentId)
    res.status(400).json({
      success:false,
      message: " commentid required to delte the if  ",

     })
   }


          post.comments.forEach((item, index)=>{
            if(item._id.toString()  === req.body.commentId.toString()){
             return   post.comments.splice(index, 1)
            }
          
          })

          await post.save()
         return  res.status(200).json({
            success:true,
            message: " your  comment deleted ",
      
           })

        }else{



       
          post.comments.forEach((item, index)=>{
            if(item.user.toString()  === req.user._id.toString()){
           return   post.comments.splice(index, 1)
            }
          
          })

          await post.save()
          return   res.status(200).json({
            success:true,
            message: " selected comment deleted ",
      
           })

       

        }



  

         
        // await post.save()
    
     
    
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
    
    
    
    
    
      }