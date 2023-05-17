

import axios from 'axios'





export const deletePostAction =(id)=>async(dispatch)=>{
    try {
        dispatch({type:"deletePostRequest"})

     
        const {data} = await axios.delete(`/api/v1/post/${id}`) 

           dispatch({type:"deletePostSuccess" , payload:data.message})

        
    } catch (error) {
        dispatch({type:"deletePostFail", payload:error.response.data.message})
    }
   }























export const updateCaptionAction =(id, caption)=>async(dispatch)=>{
    try {
        dispatch({type:"updateCaptionRequest"})
        console.log({id, caption})
        const {data} = await axios.put(`/api/v1/post/${id}`,{caption}  ,{
            headers:{
                "Content-Type":"application/json"
            }
           }) 

           dispatch({type:"updateCaptionSuccess" , payload:data.message})

        
    } catch (error) {
        dispatch({type:"updateCaptionFail", payload:error.response.data.message})
    }
   }
























export const createNewPostAction =(caption, image)=>async(dispatch)=>{
    try {
        dispatch({type:"newPostRequest"})
        const {data} = await axios.post(`/api/v1/post/upload`,{caption,image}  ,{
            headers:{
                "Content-Type":"application/json"
            }
           }) 

           dispatch({type:"newPostSuccess" , payload:data.message})

        
    } catch (error) {
        dispatch({type:"newPostFail", payload:error.response.data.message})
    }
   }











export const getMyPostsAction =()=>async(dispatch)=>{
    try {
        dispatch({type:"myPostRequest"})
        const {data} = await axios.get(`/api/v1/my/posts`,  ) 

           dispatch({type:"myPostSuccess" , payload:data.posts})

        
    } catch (error) {
        dispatch({type:"myPostFail", payload:error.response.data.message})
    }
   }















export const deleteCommentOnPostAction =(id,commentId)=>async(dispatch)=>{
    try {
        dispatch({type:"deleteCommentRequest"})
        // console.log({id,commentId})
        const {data} = await axios.delete(`/api/v1/post/comment/${id}`, {data:{commentId}} ,
         ) 

           dispatch({type:"deleteCommentSuccess" , payload:data.message})

        
    } catch (error) {
        dispatch({type:"deleteCommentFail", payload:error.response.data.message})
    }
   }







export const addCommentOnPostAction =(id, comment)=>async(dispatch)=>{
    try {
        dispatch({type:"addCommentRequest"})
        const {data} = await axios.put(`/api/v1//post/comment/${id}`, {comment}  ,{
            headers:{
                "Content-Type":"application/json"
            }
           }) 

           dispatch({type:"addCommentSuccess" , payload:data.message})

        
    } catch (error) {
        dispatch({type:"addCommentFail", payload:error.response.data.message})
    }
   }




export const likeAndUnlikeAction =(id)=>async(dispatch)=>{
    try {
        dispatch({type:"likeRequest"})
        const {data} = await axios.get(`/api/v1/post/${id}`  ,{
            headers:{
                "Content-Type":"application/json"
            }
           }) 

           dispatch({type:"likeSuccess" , payload:data.message})

        
    } catch (error) {
        dispatch({type:"likeFail", payload:error.response.data.message})
    }
   }


   