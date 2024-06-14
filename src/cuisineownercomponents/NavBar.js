import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/AuthProvider'
import LogoutIcon from '@mui/icons-material/Logout';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ApiCall } from '../hooks/ApiCall';
import { ToastMessage } from '../utils';
import { Close } from '@mui/icons-material';

export const NavBar = () => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCuisines, setFilteredCuisines] = useState([]);

  const socketRef = useRef(null);

  useEffect(() => {
      // Function to initialize the WebSocket connection
      const initializeWebSocket = () => {
          socketRef.current = new WebSocket("ws://localhost:8000/ws/search_cuisine/");

          // Listen for messages from the WebSocket connection
          socketRef.current.onmessage = (event) => {
              const data = JSON.parse(event.data);
              const cuisines = data.cuisines;
              // Update the state with filtered cuisines
              setFilteredCuisines(cuisines);
          };

          socketRef.current.onerror = (error) => {
              console.error('WebSocket error:', error);
          };

          socketRef.current.onclose = () => {
              console.log('WebSocket connection closed. Reconnecting...');
              setTimeout(initializeWebSocket, 1000); 
          };
      };

      initializeWebSocket();

      return () => {
          if (socketRef.current) {
              socketRef.current.close();
          }
      };
  }, []);

  const handleSearchQuery = (query) => {
      setSearchQuery(query);
      if(query.length === 0){
        return setFilteredCuisines([])
      }
      console.log(JSON.stringify({ search_query: query }));
      // Send the search query over the WebSocket connection
      if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
          socketRef.current.send(JSON.stringify({ search_query: query }));
      }
  };


    useEffect(() => {
      console.log(filteredCuisines)
    }, [filteredCuisines])

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
    <div className='hidden fixed lg:flex flex-row justify-between px-3 shadow-md top-2 left-64 right-2 py-2.5 items-center rounded-md bg-gray-600 text-white'>
        <p className='poppins hover:cursor-pointer' onClick={() => {navigate('/home')}}>EthnicEats</p>
        <input placeholder='Search' value={searchQuery} onChange={(e) => handleSearchQuery(e.target.value)} className=' text-gray-900 px-3 py-1 rounded-xl border-slate-700'></input>
        <FilteredContainer filteredCuisines={filteredCuisines} />
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

const FilteredContainer = ({ filteredCuisines }) => {
    const [displayList, setDisplayList] = useState([]);
    const current_location = window.location.pathname

    // Update displayList whenever filteredCuisines changes
    useEffect(() => {
      setDisplayList(filteredCuisines.slice(0, 5));
    }, [filteredCuisines]);

    const handleClickOnClose = useCallback((index) => {
      setDisplayList((prevList) => prevList.filter((_, i) => i !== index));
    }, []);

    const role = localStorage.getItem("role")
    


    return (
      <div className={`${displayList.length === 0 ? 'hidden' : 'z-1000000 fixed top-20 centered-div flex bg-gray-100 flex-col w-400px rounded-md shadow-md py-1.5'}`}>
        {
          displayList.map((cuisine, index) => (
            <div key={index} className='text-gray-900 flex justify-between items-center hover:bg-gray-300 rounded-md mx-1 py-1 px-2 hover:cursor-pointer text-sm'>
              <Link to={role === 'owner'? `/cuisine-owner/cuisine/${cuisine[0]}/menu`: `/cuisine/${cuisine[0]}/menu`} className='basis-4/5'>{cuisine[1]}</Link>
              <div onClick={() => handleClickOnClose(index)}>
                <Close />
              </div>
            </div>
          ))
        }
      </div>
    );
  };
