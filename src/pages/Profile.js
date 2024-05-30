import React, { useEffect, useState } from 'react'
import { ApiCall } from '../hooks/ApiCall';
import { useAuth } from '../hooks/AuthProvider';
import { ToastContainer } from 'react-toastify';
import { ToastMessage } from '../utils';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { CuisineTabs } from '../cuisineownercomponents';
import LoadingSpinner from './LandingPage';


export const Profile = () => {
    const navigate = useNavigate()
    const userAuth = useAuth()
    const {token, refresh, setToken, setRefresh, logOut} = userAuth
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [dateJoined, setDateJoined] = useState('')
    const [loading, setLoading] = useState(true)

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
            setTimeout(() => {logOut()}, 1000)
        }, 2000)
    }

    useEffect(() => {
        setTimeout(() => {
          setLoading(false)
        }, 2000)
      }, [])
    
      if (loading){
        return <LoadingSpinner />
      }


    const fetchUserInfo = () => {
        ApiCall('auth/user/', 'get', token, refresh, setToken, setRefresh)
        .then(function(response){
            if(response.status === 200){
                setEmail(response.data.email)
                setDateJoined(moment.utc(response.data.date_joined).local().format('YYYY-MM-DD HH:mm:ss Z'));
                setUserName(response.data.username)
                setLoading(false)
            }
            else{
                console.log(response)
            }
        })
        .catch((error) => {
            return console.log("Someting went wrong")
        })
    }

    useEffect(() => {fetchUserInfo()}, [])


  return (
    <div className='w-auto flex flex-col justify-around h-full pt-2 lg:pt-0 px-2 w-full md:px-3 lg:px-4'>
        <ToastContainer />
        <CuisineTabs />
        <p>My Account</p>
        <p>Email: {loading? 'Loading..': email}</p>
        <p>Username: {loading? 'Loading..': userName}</p>
        <p>Date Joined: {loading? 'Loading..': dateJoined}</p>
        <Link to='/change-password' className='m-auto px-6 py-3 bg-primary text-white ring-red-400 focus:outline-none focus:ring-4 mt-6 rounded-lg transition duration-300 poppins'>Change Password</Link>
        <button onClick={(e) => handleLogout(e)}>Log Out</button>
    </div>
  )
}
