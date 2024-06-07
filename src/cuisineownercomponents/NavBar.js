import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/AuthProvider'
import LogoutIcon from '@mui/icons-material/Logout';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ApiCall } from '../hooks/ApiCall';
import { ToastMessage } from '../utils';

export const NavBar = () => {
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate()

    const [searchQuery, setSearchQuery] = useState('');
    // const [filteredCuisines, setFilteredCuisines] = useState([]);

    // useEffect(() => {
    //       const socket = new WebSocket("ws://localhost:10000/ws/cuisine/");

    //       // Listen for messages from the WebSocket connection
    //       socket.onmessage = (event) => {
    //           const data = JSON.parse(event.data);
    //           const cuisines = data.cuisines;
    //           // Update the state with filtered cuisines
    //           setFilteredCuisines(cuisines);
    //       };

    //       // Clean up function
    //       return () => {
    //           socket.close();
    //       };
    //   }, [searchQuery]);

    //   const handleSearchQuery = (query) => {
    //     setSearchQuery(query);
    //     // Send the search query over the WebSocket connection
    //     const socket = new WebSocket("ws://localhost:10000/ws/cuisine/");
    //     socket.send(JSON.stringify({ search_query: query }));
    // };

    const userAuth = useAuth()
    const {token, refresh, setToken, setRefresh, logOut} = userAuth
    const handleLogout = (e) => {
      e.preventDefault();
      const data = {
          refresh_token: refresh
      }
      ApiCall('auth/logout/', 'post', token, refresh, setToken, setRefresh, data)
      .then(function(response){
          if (response.status === 205) {
              console.log("Token blacklisted")
          }
      })
      .catch((error) => {
          return console.log("An error occured logut")
      })
      ToastMessage("success", "Logout Successful")
      setTimeout(() => {
          logOut()
      }, 2000)
  }
  return (
    <div className='hidden lg:flex w-full flex-row justify-between px-3 shadow-md mt-0.5 mx-2 py-2.5 items-center rounded-md bg-gray-600 text-white'>
        <p className='poppins hover:cursor-pointer' onClick={() => {navigate('/home')}}>EthnicEats</p>
        <input placeholder='Search' value={searchQuery} onChange={(e) => handleSearchQuery(e.target.value)} className=' text-gray-900 px-3 py-1 rounded-xl border-slate-700'></input>
        <div className='hover:cursor-pointer relative mr-7' onClick={(e) => handleLogout(e)} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
          <LogoutIcon />
          {isHovered && (
        <div className='z-100000 absolute top-full mt-1 bg-gray-800 text-white text-sm p-2 rounded shadow-lg'>
          Logout
        </div>
      )} 
        </div>
    </div>
  )
}
