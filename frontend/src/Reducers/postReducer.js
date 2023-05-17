import { createReducer  } from "@reduxjs/toolkit";


const intialState ={


}





















export const user =createReducer(intialState, {


    userPostRequest:(state,action) =>{
        state.loading = true
    },
    userPostSuccess:(state,action) =>{

        state.loading = false
        state.posts =action.payload

    },
    userPostFail:(state,action) =>{
        state.loading = true
        state.error =action.payload  

    },

    
  

    clearErrors:(state,action) =>{
        state.error = null
    },
  
})




export const userProfileReducer =createReducer(intialState, {


    userProfileRequest:(state,action) =>{
        state.loading = true
    },
    userProfileSuccess:(state,action) =>{

        state.loading = false
        state.user =action.payload

    },
    userProfileFail:(state,action) =>{
        state.loading = true
        state.error =action.payload  

    },

    
  

    clearErrors:(state,action) =>{
        state.error = null
    },
  
})


























export const userPostReducer =createReducer(intialState, {


    userPostRequest:(state,action) =>{
        state.loading = true
    },
    userPostSuccess:(state,action) =>{

        state.loading = false
        state.posts =action.payload

    },
    userPostFail:(state,action) =>{
        state.loading = true
        state.error =action.payload  

    },

    
  

    clearErrors:(state,action) =>{
        state.error = null
    },
  
})

















export const myPostReducer =createReducer(intialState, {


    myPostRequest:(state,action) =>{
        state.loading = true
    },
    myPostSuccess:(state,action) =>{

        state.loading = false
        state.posts =action.payload

    },
    myPostFail:(state,action) =>{
        state.loading = true
        state.error =action.payload  

    },




    
    clearError:(state,action) =>{
        state.error = null
    },

    clearErrors:(state,action) =>{
        state.error = null
    },
  
})









export const likeReducer =createReducer(intialState, {

    followUserRequest: (state,action) =>{ 
        state.loading = true
       
    },
    followUserSuccess: (state,action) =>{
        state.loading = false
        state.message =action.payload
        

     },
     followUserFail: (state,action) =>{
        state.loading = false
        state.error = action.payload

     },











    resetPasswordRequest: (state,action) =>{ 
        state.loading = true
       
    },
    resetPasswordSuccess: (state,action) =>{
        state.loading = false
        state.message =action.payload
        

     },
     resetPasswordFail: (state,action) =>{
        state.loading = false
        state.error = action.payload

     },













    forgotPasswordRequest: (state,action) =>{ 
        state.loading = true
       
    },
    forgotPasswordSuccess: (state,action) =>{
        state.loading = false
        state.message =action.payload
        

     },
     forgotPasswordFail: (state,action) =>{
        state.loading = false
        state.error = action.payload

     },


















      deleteProfileRequest: (state,action) =>{ 
        state.loading = true
       
    },
      deleteProfileSuccess: (state,action) =>{
        state.loading = false
        state.message =action.payload
        

     },
      deleteProfileFail: (state,action) =>{
        state.loading = false
        state.error = action.payload

     },
















    UpdatePasswordRequest: (state,action) =>{ 
        state.loading = true
       
    },
    UpdatePasswordSuccess: (state,action) =>{
        state.loading = false
        state.message =action.payload
        

     },
    UpdatePasswordFail: (state,action) =>{
        state.loading = false
        state.error = action.payload

     },









    UpdateProfileRequest: (state,action) =>{ 
        state.loading = true
       
    },
    UpdateProfileSuccess: (state,action) =>{
        state.loading = false
        state.message =action.payload
        

     },
    UpdateProfileFail: (state,action) =>{
        state.loading = false
        state.error = action.payload
  

     },












    deletePostRequest:(state,action) =>{
        state.loading = true
    },
    deletePostSuccess:(state,action) =>{

        state.loading = false
        state.message =action.payload

    },
    deletePostFail:(state,action) =>{
        state.loading = true
        state.error =action.payload  

    },





















    updateCaptionRequest:(state,action) =>{
        state.loading = true
    },
    updateCaptionSuccess:(state,action) =>{

        state.loading = false
        state.message =action.payload

    },
    updateCaptionFail:(state,action) =>{
        state.loading = true
        state.error =action.payload  

    },
















    newPostRequest:(state,action) =>{
        state.loading = true
    },
    newPostSuccess:(state,action) =>{

        state.loading = false
        state.message =action.payload

    },
     newPostFail:(state,action) =>{
        state.loading = true
        state.error =action.payload  

    },









    likeRequest:(state,action) =>{
        state.loading = true
    },
    likeSuccess:(state,action) =>{

        state.loading = false
        state.message =action.payload

    },
    likeFail:(state,action) =>{
        state.loading = true
        state.error =action.payload  

    },



    addCommentRequest:(state,action) =>{
        state.loading = true
    },
    addCommentSuccess:(state,action) =>{

        state.loading = false
        state.message =action.payload

    },
    addCommentFail:(state,action) =>{
        state.loading = true
        state.error =action.payload  

    },



    
    deleteCommentRequest:(state,action) =>{
        state.loading = true
    },
    deleteCommentSuccess:(state,action) =>{

        state.loading = false
        state.message =action.payload

    },
    deleteCommentFail:(state,action) =>{
        state.loading = true
        state.error =action.payload  

    },






    clearErrors:(state,action) =>{
        state.error = null
        state.loading = false
    },

    clearError:(state,action) =>{
        state.error = null
    },
    clearMessage:(state,action) =>{
        state.message = null
    },
})