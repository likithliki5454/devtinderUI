import NavBar from './NavBar'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import axios from 'axios'
import { API_URL } from './Components/utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { addUser } from './Components/utils/userSlice'


const Body = () => {

  const dispatch=useDispatch();
  const navigate=useNavigate();
  const userdata=useSelector((store)=>{
    return store.user;
  })

  const fetchuser=async()=>{
    if(userdata) return;
    try{
        const res=await axios.get(API_URL+'/profile/view',{
            withCredentials:true
        })
        console.log(res.data);
        dispatch(addUser(res.data))
    }
    catch(err){
        console.log(err);
        navigate('/login')
    }
  }

  useEffect(()=>{
    fetchuser();
  },[])

  return (
    <div>
            <NavBar />
            <Outlet />
            <Footer/>
    </div>
  )
}

export default Body