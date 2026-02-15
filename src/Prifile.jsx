import React from 'react'
import EditProfile from './Components/EditProfile'
import { useSelector } from 'react-redux'

const Prifile = () => {

  const user =useSelector((store)=>{
    return store.user;
  })
  return (
    user && <div><EditProfile user={user}/></div>
  ) 
}

export default Prifile