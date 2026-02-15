import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addFeed } from './utils/feedSlice';
import axios from 'axios';
import { API_URL } from './utils/constants';
import UserCard from './UserCard';

const FeedPage = () => {

    const dispatch=useDispatch();
    const navigate=useNavigate();
    const feeddata=useSelector((store)=>{
        return store.feed;
    })

    const getFeed = async () => {
        if(feeddata) return;
        try {
        const res = await axios.get(API_URL + '/feed', {
            withCredentials: true,
        });
            dispatch(addFeed(res.data.users));
            navigate('/');
            console.log(res)
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {   
        getFeed();      
    })


    return (
        <div className="p-4 flex justify-center my-10">
            <UserCard userdata={feeddata}/>
        </div>
    )
}

export default FeedPage;