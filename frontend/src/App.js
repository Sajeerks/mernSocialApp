import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./compoenents/Header/Header.jsx";
import toast, { Toaster } from "react-hot-toast";
import Login from "./compoenents/Login/Login";
import { useDispatch, useSelector } from "react-redux";
import { loadUserIntialAction } from "./Actions/userActions";
import Home from "./compoenents/Home/Home";
import Account from "./compoenents/Account/Account";
import NewPost from "./compoenents/NewPost/NewPost";
import Register from "./compoenents/Register/Register";
import UpdateProfile from "./compoenents/UpdateProfile/UpdateProfile";
import UpdatePassword from "./compoenents/UpdatePassword/UpdatePassword";
import ForgotPassword from "./compoenents/ForgotPassword/ForgotPassword";
import ResetPassword from "./compoenents/ResetPassword/ResetPassword";
import UserProfile from "./compoenents/UserProfile/UserProfile";
import Search from "./compoenents/Search/Search.js";
import NotFound from "./compoenents/NotFound/NotFound.js";


// import Loader from "./compoenents/Loader/Loader";
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUserIntialAction());
  }, []);

  const  {isAuthenticated, user, error} = useSelector(state=>state.user)



  return (
    <Router>
     { isAuthenticated  && <Header/>}
      <Routes>
           <Route path="/" element ={isAuthenticated ?<Home user={user}/> :   <Login />} />
           <Route path="/newpost" element ={isAuthenticated ?<NewPost user={user}/> :   <Login />} />
           <Route path="/register" element ={isAuthenticated ?<Account user={user}/> :   <Register />} />



           <Route path="/account" element ={isAuthenticated ?<Account user={user}/> :   <Login />} />
           <Route path="/update/profile" element ={isAuthenticated ?<UpdateProfile user={user}/> :   <Login />} />
           <Route path="/update/password" element ={isAuthenticated ?<UpdatePassword user={user}/> :   <Login />} />
           <Route path="/forgot/password" element ={<ForgotPassword />  } />
           <Route path="/password/reset/:token" element ={<ResetPassword />  } />
           <Route path="/user/:id" element ={isAuthenticated ?<UserProfile user={user}/> :   <Login/> }/>
           <Route path="/search" element ={<Search />  } />





           <Route path="*" element ={<NotFound />  } />










           {/* <Route path="/loader"  element ={<Loader/>} /> */}
      </Routes>
    

      <Toaster />
    </Router>
  );
}

export default App;
