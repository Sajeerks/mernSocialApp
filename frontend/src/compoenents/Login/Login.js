import React, { useEffect, useState } from "react";
import "./Login.css";
import { Typography, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from 'react-hot-toast'
import { loginUserActiokn } from "../../Actions/userActions";


const Login = () => {
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
    const [data, setData] = useState({
       
        email: '',
        password: ''   
    });
    const {email, password} = data
    // console.log({email, password})
    // console.log(data)
  const {loading, user , error } =useSelector(state=>state.user)
    const dispatch = useDispatch();
    const navigate =useNavigate()

    const loginHandler = (e) => {
        e.preventDefault();
      
        dispatch(loginUserActiokn(email, password));

      };

      useEffect(() => {
        if(error){
          toast.error(error)
          dispatch({type:"clearError"})
          // navigate("/login")
        }
        // if(!user){
        //   navigate("/")
        // }
        
      
      }, [error, dispatch, user])
      


  return (
<div className="login">
      <form className="loginForm" onSubmit={loginHandler}>
        <Typography variant="h3" style={{ padding: "2vmax" }}>
          Social Aap
        </Typography>

        <input
          type="email"
          placeholder="Email"
          required
          name="email"

    value={email.email}
        //   onChange={(e) => setEmail(e.target.value)}
          onChange={(e) => setData({...data, [e.target.name]: e.target.value})}
 
        />

        <input
          type="password"
          // placeholder="Password"
          required
          name="password"
        //   value={data.password}
        //   onChange={(e) => setPassword(e.target.value)}
        onChange={(e) => setData({...data, [e.target.name]: e.target.value})}

        />

        <Link to="/forgot/password">
          <Typography>Forgot Password?</Typography>
        </Link>

        <Button type="submit">Login</Button>

        <Link to="/register">
          <Typography>New User?</Typography>
        </Link>
      </form>
    </div>
  )
}

export default Login