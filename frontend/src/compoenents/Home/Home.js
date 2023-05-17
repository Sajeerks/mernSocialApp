import React, { useEffect } from "react";
import "./Home.css";
import User from "../User/User";
import Post from "../Post/Post";
import { useDispatch } from "react-redux";
import { getAllUsersAction, getFollowingPostsAction } from "../../Actions/userActions";
import { useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import { Typography } from "@mui/material";
import { toast } from "react-hot-toast";
import { useState } from "react";

const Home = ({ user }) => {

    const dispatch  = useDispatch()

    const {posts, error,loading:postLoading} = useSelector(state=>state.postOffollowing)
    const {users, error:allUsersError,loading:allUSersLoading} = useSelector(state=>state.allUsers)
  
   
  const [likedLength, setlikedLength] = useState(false)

// console.log({likedLength})

    useEffect(() => {
        dispatch(getAllUsersAction())
     dispatch(getFollowingPostsAction())
    // console.log("doissas")
    }, [])


    // }, [likedLength])



    const {likeLoading:loading, message:LikeMessage, error:likeError} = useSelector(state=>state.likeReducer)

useEffect(() => {

 if(LikeMessage){
toast.success(LikeMessage)

dispatch({type:"clearMessage"})
 }
 

 if(likeError){
     toast.error(likeError)
     dispatch({type:"clearError"})
 }

}, [LikeMessage, likeError, toast])



   
    
  return (  <>
  {postLoading === true || allUSersLoading === true?( <Loader/>):(  <>
    
    <div className="home">
  <div className="homeleft">
    {posts && posts.length>0 ?
    
   posts.map((post, index)=>(
       <Post key={post._id} 
       
       postId ={post._id}
  caption ={post.caption}
  postImage={post.image ? post.image.url : `https://image.shutterstock.com/image-photo/wind-turbines-farm-beautiful-orange-260nw-1449359885.jpg`}
  likes ={post.likes}
  comments = {post.comments}
  ownerImage = {post.owner.avatar.url}
  ownerName={post.owner.name}
  ownerId ={post.owner._id}
  isDelete = {false}
  isAccount = {false}
       
  setlikedLength ={setlikedLength}
  likedLength={likedLength}
       
       />
   ) ):<Typography> no posts to follow</Typography>}


{/* <Post 
postImage={`https://image.shutterstock.com/image-photo/wind-turbines-farm-beautiful-orange-260nw-1449359885.jpg`}
caption={"my firist post ever at this site"}
ownerName={"mehabm unna"}
isDelete={true}
isAccount ={true}
/> */}

  </div>
  <div className="homeright">

    {users && users.length>0 ?(<>

          {users.map((user,index)=>(
    <User userId={user._id} name={user.name} avatar={user.avatar}  key={user._id}/>

          ))}
      
    </>):(<><Typography>No users yet</Typography> </>)}
  </div>
</div>
    
    </>)}
    </>
  );
};

export default Home;
