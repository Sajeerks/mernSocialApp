import React from 'react'
import "./CommentCard.css"


import { Button, Typography } from "@mui/material";

import { Link, useParams } from "react-router-dom";
import "./CommentCard.css";
import { Delete } from "@mui/icons-material";
import { useDispatch, useSelector } from 'react-redux';
import { deleteCommentOnPostAction, getMyPostsAction } from '../../Actions/postActions';
import { getFollowingPostsAction, getUserPostsAction } from '../../Actions/userActions';

const CommentCard = ({


  userId,
  name,
  avatar,
  comment,
  commentId,
  postId,
  isAccount,
}) => {

  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const params = useParams()

  const deleteCommentHandle = () => {
   console.log("plese dlelete this i")

    dispatch(deleteCommentOnPostAction(postId, commentId));


    if (isAccount) {
      dispatch(getMyPostsAction());
    } else {
      dispatch(getFollowingPostsAction());
    }


    if(params.id){
      dispatch(getUserPostsAction(params.id))
    
     }


  };
  return (
    <div className="commentUser">
    <Link to={`/user/${userId}`}>
      <img src={avatar} alt={name} />
      <Typography style={{ minWidth: "6vmax" }}>{name}</Typography>
    </Link>
    <Typography>{comment}</Typography>

    {isAccount ? (
      <Button onClick={deleteCommentHandle}>
        <Delete />
      </Button>
    ) : userId === user._id ? (
      <Button onClick={deleteCommentHandle}>
        <Delete />
      </Button>
    ) : null}
  </div>
  )
}

export default CommentCard