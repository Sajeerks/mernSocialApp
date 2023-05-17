import React from 'react'
import './User.css'
import { Link } from 'react-router-dom'
import { Typography } from '@mui/material'

const User = ({userId, name,avatar}) => {
    // console.log(avatar)
  return (

    <Link  to={`/user/${userId}`} className='homeUser'>

  
  
  
  
  
<img src={avatar && avatar.url}  alt={name}/>
    <Typography> {name}</Typography> 

  
   </Link>
  
  )
}

export default User