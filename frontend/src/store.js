import {configureStore} from '@reduxjs/toolkit'
import { allUsersReducer, postFollowingReducer, userReducer } from './Reducers/userReducer'
import { likeReducer, myPostReducer, userPostReducer, userProfileReducer } from './Reducers/postReducer'




const store = configureStore(  {
    reducer:{
     user:userReducer,
     postOffollowing:postFollowingReducer,
     allUsers:allUsersReducer,
     likeReducer:likeReducer,
     myPosts:myPostReducer,
     userPostsReducer:userPostReducer,
     userProfileReducer:userProfileReducer,

    }
})

export default  store   