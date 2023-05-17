import axios from 'axios'



// ,
// ,
// ,




export const followAndUnfollowUserAction  = (id)=>async(dispatch)=>{
   try {
      
      dispatch({type:"followUserRequest"})
         const {data} = await axios.get(`/api/v1/follow/${id}`,{
            headers:{
               "Content-Type":"application/json"
            }
         } ) 
         dispatch({type:"followUserSuccess" , payload:data.message})
  
   } catch (error) {
     console.log("eror in followUserFail",error)
      dispatch({type:'followUserFail' , payload:error.response.data.message})
   }
  
  
}






export const getUserPostsAction  = (id)=>async(dispatch)=>{
   try {
      
      dispatch({type:"userPostRequest"})
         const {data} = await axios.get(`/api/v1/userposts/${id}`,{
            headers:{
               "Content-Type":"application/json"
            }
         } ) 
         dispatch({type:"userPostSuccess" , payload:data.posts})
  
   } catch (error) {
   //   console.log("eror in resetPasswordFail",error)
      dispatch({type:'userPostFail' , payload:error.response.data.message})
   }
  
  }


  
export const getUserProfileAction  = (id)=>async(dispatch)=>{
   try {
      
      dispatch({type:"userProfileRequest"})
         const {data} = await axios.get(`/api/v1/user/${id}`,{
            headers:{
               "Content-Type":"application/json"
            }
         } ) 
         dispatch({type:"userProfileSuccess" , payload:data.user})
  
   } catch (error) {
     console.log("eror in userProfileFail",error)
      dispatch({type:'userProfileFail' , payload:error.response.data.message})
   }
  
  }
















export const resetPasswordAction  = (token, password)=>async(dispatch)=>{
   try {
      
      dispatch({type:"resetPasswordRequest"})
         const {data} = await axios.put(`/api/v1/password/reset/${token}`,{password},{
            headers:{
               "Content-Type":"application/json"
            }
         } ) 
         dispatch({type:"resetPasswordSuccess" , payload:data.message})
  
   } catch (error) {
     console.log("eror in resetPasswordFail",error)
      dispatch({type:'resetPasswordFail' , payload:error.response.data.message})
   }
  
  }





export const forgotPasswordAction  = (email)=>async(dispatch)=>{
    try {
       
       dispatch({type:"forgotPasswordRequest"})
          const {data} = await axios.post(`/api/v1/forgotpassword`,{email} ,{
            headers:{
               "Content-Type":"application/json"
            }
          } ) 
          dispatch({type:"forgotPasswordSuccess" , payload:data.message})
   
    } catch (error) {
      console.log("eror in forgotpass",error)
       dispatch({type:'forgotPasswordFail' , payload:error.response.data.message})
    }
   
   }










export const deleteProfiledAction  = ()=>async(dispatch)=>{
    try {
       
       dispatch({type:"deleteProfileRequest"})
          const {data} = await axios.delete("/api/v1/delete/me" ) 
          dispatch({type:"deleteProfileSuccess" , payload:data.message})
   
    } catch (error) {
       dispatch({type:'deleteProfileFail' , payload:error.response.data.message})
    }
   
   }













export const updatePasswordAction  = (oldPassword, newPassword)=>async(dispatch)=>{
    try {
       
       dispatch({type:"UpdatePasswordRequest"})
          const {data} = await axios.put("/api/v1/update/password" ,{oldPassword, newPassword } ,{
           headers:{
               "Content-Type":"application/json"
           }
          }) 
          dispatch({type:"UpdatePasswordSuccess" , payload:data.message})
   
    } catch (error) {
       dispatch({type:'UpdatePasswordFail' , payload:error.response.data.message})
    }
   
   }




export const updateProfileAction  = (name,email , avatar)=>async(dispatch)=>{
    try {
       
       dispatch({type:"UpdateProfileRequest"})
          const {data} = await axios.put("/api/v1/update/profile" ,{name,email, avatar } ,{
           headers:{
               "Content-Type":"application/json"
           }
          }) 
          dispatch({type:"UpdateProfileSuccess" , payload:data.message})
   
    } catch (error) {
       dispatch({type:'UpdateProfileFail' , payload:error.response.data.message})
    }
   
   }




export const registerUserAction  = (name,email, password , avatar)=>async(dispatch)=>{
    try {
       console.log({email, password})
       dispatch({type:"RegisterRequest"})
          const {data} = await axios.post("/api/v1/register" ,{name,email, password, avatar } ,{
           headers:{
               "Content-Type":"application/json"
           }
          }) 
        //   console.log( "datat form registeruserAction " , data)
          dispatch({type:"RegisterSuccess" , payload:data})
   
    } catch (error) {
       dispatch({type:'RegisterFail' , payload:error.response.data.message})
    }
   
   }






















export const loginUserActiokn  = (email, password)=>async(dispatch)=>{
 try {
    console.log({email, password})
    dispatch({type:"loginRequest"})
       const {data} = await axios.post("/api/v1/login" ,{email, password } ,{
        headers:{
            "Content-Type":"application/json"
        }
       }) 
       dispatch({type:"loginSuccess" , payload:data.user})

 } catch (error) {
    dispatch({type:'loginFail' , payload:error.response.data.message})
 }

}



export const logoutUserAction  = ()=>async(dispatch)=>{
    try {
       dispatch({type:"logoutRequest"})
         await axios.get("/api/v1/logout"  ) 
          dispatch({type:"logoutSuccess" , })
   
    } catch (error) {
       dispatch({type:'logoutFail' , payload:error.response.data.message})
    }
   
   }




export const loadUserIntialAction  = ()=>async(dispatch)=>{
    try {
    
       dispatch({type:"LoadUserRequest"})
          const {data} = await axios.get("/api/v1/me"  ,{
           headers:{
               "Content-Type":"application/json"
           }
          }) 
          dispatch({type:"LoadUserSuccess" , payload:data.user})
   
    } catch (error) {
       dispatch({type:'LoadUserFail' , payload:error.response.data.message})
    }
   
   }


   export const getFollowingPostsAction =()=>async(dispatch)=>{
    try {
        dispatch({type:"postFollowingRequest"})
        const {data} = await axios.get("/api/v1/posts"  ,{
            headers:{
                "Content-Type":"application/json"
            }
           }) 
           dispatch({type:"postFollowingSuccess" , payload:data.posts})

        
    } catch (error) {
        dispatch({type:"postFollowingFail", payload:error.response.data.message})
    }
   }




   export const getAllUsersAction =(name="")=>async(dispatch)=>{
    try {
        dispatch({type:"allUsersRequest"})
        const {data} = await axios.get(`/api/v1/users?name=${name}` ,{
            headers:{
                "Content-Type":"application/json"
            }
           }) 

           dispatch({type:"allUsersSuccess" , payload:data.users})

        
    } catch (error) {
        dispatch({type:"allUsersFail", payload:error.response.data.message})
    }
   }