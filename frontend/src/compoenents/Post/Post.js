import React, { useEffect, useState } from "react";
import "./Post.css";
import { Avatar, Button, Dialog, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { ChatBubbleOutline, DeleteOutline, Favorite, FavoriteBorder, MoreVert } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { addCommentOnPostAction, deleteCommentOnPostAction, deletePostAction, getMyPostsAction, likeAndUnlikeAction, updateCaptionAction } from "../../Actions/postActions";
import { toast } from "react-hot-toast";
import { getFollowingPostsAction, getUserPostsAction, loadUserIntialAction } from "../../Actions/userActions";
import User from "../User/User";
import CommentCard from "../CommentCard/CommentCard";

const Post = ({
  postId,
  caption,
  postImage,
  likes = [],
  comments = [],
  ownerImage,
  ownerName,
  ownerId,
  isDelete = false,
  isAccount = false,

  // setlikedLength,
  // likedLength
}) => {
  const [liked, setLiked] = useState(false);
  const [likesUser, setLikesUser] = useState(false);
  const [commentValue, setCommentValue] = useState("");
  const [commentToggle, setCommentToggle] = useState(false);
  const [captionValue, setCaptionValue] = useState(caption);
  const [captionToggle, setCaptionToggle] = useState(false);
  // const [likeLengthInPostElement, setlikeLengthInPostElement] = useState(likes.length)


  const dispatch = useDispatch()
  const params = useParams()

 const handleLike =async (postId)=>{
    setLiked(!liked)
  await   dispatch(likeAndUnlikeAction(postId))

  if(isAccount ){
    dispatch(getMyPostsAction())
  }else{
    dispatch(getFollowingPostsAction())
  }
    
    // setlikedLength(!likedLength)
    
  

 }
     
 const {user} =useSelector(state=>state.user)
  
useEffect(() => {
  likes.forEach(item=>{
    if(item._id === user._id){
      setLiked(true)
    
    }
   })


}, [likes, user._id])



const addCommentHandler =async (e)=>{
e.preventDefault()
// console.log({postId})
await dispatch(addCommentOnPostAction(postId, commentValue)) 

setCommentToggle(!commentToggle)

if(params.id){
  dispatch(getUserPostsAction(params.id))

 }

if(isAccount ){
  dispatch(getMyPostsAction())
 }else{
   dispatch(getFollowingPostsAction())
 }

}

const updateCaptionHandler =()=>{
  setCaptionToggle(!captionToggle)


}


const editCommentHandler =async (e)=>{
  e.preventDefault()
   

    await dispatch(updateCaptionAction(postId, captionValue))
    await dispatch(getMyPostsAction())
 dispatch(loadUserIntialAction())

  setCaptionToggle(!captionToggle)

}

const deletePostHandler =async () =>{
  // console.log({postId})
 await dispatch( deletePostAction(postId))
 
 await  dispatch(getMyPostsAction())

 if(params.id){
  dispatch(getUserPostsAction(params.id))

 }
}


  return (
    <div className="post">
      <div className="postHeader">
   {isAccount ? <Button>
     <MoreVert    onClick={updateCaptionHandler}  />
   </Button>: null}

         
      </div>
      <img src={postImage} alt="Post" />
      <div className="postDetails">
        <Avatar
          src={ownerImage}
          al="User"
          sx={{
            height: "3vmax",
            width: "3vmax",
          }}
        />
        <Link to={`/user/${ownerId}`}>
          <Typography fontWeight={700}>{ownerName} </Typography>
        </Link>
        <Typography
          fontWeight={100}
          color="rgba(0,0,0,0.582)"
          style={{ alignSelf: "center", wordWrap:"break-word" , overflow:"scroll"  , width:"100%" , height:"10vh"}}
        >
          {caption}
        </Typography>
      </div>

      <button
        style={{
          border: "none",
          backgroundColor: "white",
          cursor: "pointer",
          margin: "1vmax 2vmax",
        }}
        disabled ={likes.length === 0 }
        onClick={()=>setLikesUser(true)}
      >
        <Typography>{likes.length} people like this </Typography>

      </button>
      <div className="postFooter">
                <Button onClick={ (e)=>{handleLike(postId)}}>  {liked? <Favorite style={{color:'red'}}/> :       <FavoriteBorder/>}
        
                </Button>
                <Button onClick={(e)=>setCommentToggle(!commentToggle)}>
               <ChatBubbleOutline/>
                </Button>
               {isDelete ?(     <Button  onClick={deletePostHandler}  >
               <DeleteOutline  />
                </Button>):(null)}
      </div>
 <Dialog  open={likesUser} onClose={()=>{setLikesUser(!likesUser)}}>

  <div className="DialogBox">
     <Typography variant="h4">LIked BY</Typography>
     
     {likes.map((user,index)=>(
    <User userId={user._id} name={user.name} avatar={user.avatar}  key={user._id}/>

          ))}

  </div>

 </Dialog>

 <Dialog  open={commentToggle} onClose={()=>{setCommentToggle(!commentToggle)}}>

  <div className="DialogBox">
     <Typography variant="h4">Comments</Typography> 

     <form className="commentForm"  onSubmit={(e)=>{addCommentHandler(e)}}>
      <input type="text" value ={commentValue} onChange={(e)=>setCommentValue(e.target.value)} 
       placeholder="Comment here..."
       required
      /> 
      <Button variant="contained" type="submit">
        Add  Comment
      </Button>

 

     </form>

       {comments.length >0 ?comments.map((comment, index)=>(
      


      <CommentCard
      
       key={comment._id}
      
      userId ={comment.user && comment.user._id}
      name ={comment.user &&  comment.user. name}
      avatar ={ comment.user &&  comment.user.avatar.url}
      comment={comment.comment && comment.comment}
      commentId={comment._id && comment._id}
      postId={postId}
      isAccount={false}
      />
          
          

          
          
        
       ))   :(<Typography>No comment added yet</Typography>)}


  </div>

 </Dialog>




 <Dialog  open={captionToggle} onClose={()=>{setCaptionToggle(!captionToggle)}}>

  <div className="DialogBox">
     <Typography variant="h4">Edit COmments</Typography> 

     <form className="commentForm"  onSubmit={(e)=>{editCommentHandler(e)}}>
      <input type="text" value ={captionValue} onChange={(e)=>setCaptionValue(e.target.value)} 
       placeholder="Comment here..."
       required
      /> 
      <Button variant="contained" type="submit">
        Edit  Comment
      </Button>

 

     </form>

      


  </div>

 </Dialog>


    </div>


  );
};

export default Post;
