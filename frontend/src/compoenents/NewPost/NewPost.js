import { Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import {useNavigate} from 'react-router-dom'
import { loadUserIntialAction } from "../../Actions/userActions";
import { toast } from "react-hot-toast";
import "./NewPost.css"
import { createNewPostAction } from "../../Actions/postActions";

const NewPost = () => {
    const [image, setImage] = useState(null);
    const [caption, setCaption] = useState("");
  
    const { loading, error, message } = useSelector((state) => state.likeReducer);
  
     const navigate = useNavigate()
   
   
    const dispatch = useDispatch();

  
    const handleImageChange = (e) => {
      const file = e.target.files[0];
  
      const Reader = new FileReader();
      Reader.readAsDataURL(file);
  
      Reader.onload = () => {
        if (Reader.readyState === 2) {
          setImage(Reader.result);
        }
      };
    };
  
    const submitHandler = async (e) => {
      e.preventDefault();
      await dispatch(createNewPostAction(caption, image));
      console.log("formsinmitted")

      dispatch(loadUserIntialAction());
      navigate("/account")
    };
  
    useEffect(() => {
      if (error) {
        toast.error(error);
        dispatch({ type: "clearErrors" });
      }
  
      if (message) {
        toast.success(message);
        dispatch({ type: "clearMessage" });
      }
    }, [dispatch, error, message, toast]);
  
    return (
      <div className="newPost">
        <form className="newPostForm" onSubmit={submitHandler}>
          <Typography variant="h3">New Post</Typography>
  
          {image && <img src={image} alt="post" />}
          <input type="file" accept="image/*" onChange={handleImageChange} />
          <input
            type="text"
            placeholder="Caption..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
          <Button disabled={loading} type="submit">
            Post
          </Button>
        </form>
      </div>
  )
}

export default NewPost
