import { createReducer  } from "@reduxjs/toolkit";


const intialState ={
   isAuthenticated : false

}

export const userReducer =createReducer(intialState ,{









    RegisterRequest: (state,action) =>{ 
        state.loading = true
       
    },
    RegisterSuccess: (state,action) =>{
        state.loading = false
        state.user =action.payload.user
        state.isAuthenticated = true
        state.message = action.payload.message


     },
    RegisterFail: (state,action) =>{
        state.loading = false
        state.error = action.payload
        state.isAuthenticated = false

     },














    loginRequest: (state,action) =>{
     state.loading = true

     },
    loginSuccess: (state,action) =>{
        state.loading = false
        state.user =action.payload
        state.isAuthenticated = true 
    },
    loginFail: (state,action) =>{
        state.loading = false
        state.error = action.payload
        state.isAuthenticated = false

    },





    LoadUserRequest: (state,action) =>{ 
        state.loading = true
    },
    LoadUserSuccess: (state,action) =>{ 
        state.loading = false
        state.user =action.payload
        state.isAuthenticated = true
        

    },
    LoadUserFail: (state,action) =>{
        state.loading = false
        state.error = action.payload
        state.isAuthenticated = false

     },









     logoutRequest: (state,action) =>{ 
        state.loading = true
    },
    logoutSuccess: (state,action) =>{ 
        state.loading = false
        state.user = null
        state.isAuthenticated = false

    },
    logoutFail: (state,action) =>{
        state.loading = false
        state.error = action.payload
        state.isAuthenticated = true

     },

     clearError :(state,action) =>{
        state.error = null 
      },

      clearErrors :(state,action) =>{
        state.error = null 
      },

      clearMessage :(state,action) =>{
        state.message = null 
      },
} )



export const postFollowingReducer = createReducer(intialState,{
        postFollowingRequest :(state,action)=>{
            state.loading = true
        },
        postFollowingSuccess :(state, action) =>{
           state.loading = false
           state.posts = action.payload
             
        },
        postFollowingFail :(state,action) =>{
            state.loading = false
           state.error = action.payload
        },
        clearError :(state,action) =>{
          state.error = null 
        },

})



export const allUsersReducer = createReducer(intialState,{
    allUsersRequest :(state,action)=>{
        state.loading = true
    },
    allUsersSuccess :(state, action) =>{
       state.loading = false
       state.users = action.payload
         
    },
    allUsersFail :(state,action) =>{
        state.loading = false
       state.error = action.payload
    },
    clearError :(state,action) =>{
      state.error = null 
    },

})