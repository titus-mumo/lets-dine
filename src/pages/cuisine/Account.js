import React, { useState, useEffect } from 'react';
import { ApiCall } from '../../hooks/ApiCall';
import { useAuth } from '../../hooks/AuthProvider';
  ;
import { ToastMessage } from '../../utils';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import moment from 'moment';
import LoadingSpinner from '../LandingPage';
import { usePreferenceList } from '../../hooks/UserPreferenceProvider';

export const Account = () => {
    const userAuth = useAuth();
    const { token, refresh, setToken, setRefresh, logOut } = userAuth;
    const [seePreferences, setSeePreferences] = useState(false);
    const [seeAccountInfo, setSeeAccountInfo] = useState(false)
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [dateJoined, setDateJoined] = useState('')
    const [loading, setLoading] = useState(true)
  
    const navigate = useNavigate();
    
  
    const handleLogout = (e) => {
      e.preventDefault();
      const data = {
        refresh_token: refresh,
      };
      ApiCall('auth/logout/', 'post', token, refresh, setToken, setRefresh, data)
        .then(function (response) {
          
        })
        .catch((error) => {
          
        })
        .finally(() => {
          ToastMessage('success', 'Logout Successful');
          setTimeout(() => {
            logOut();
          }, 2000);
        });
    };

    const handleSeePreferences = () => {
        setSeePreferences((seePreferences) => !seePreferences)
        setSeeAccountInfo(false)
    }

    const handleSeeAccountInfo = () => {
        setSeeAccountInfo((seeAccountInfo) => !seeAccountInfo)
        setSeePreferences(false)
    }

    const fetchUserInfo = () => {
        ApiCall('auth/user/', 'get', token, refresh, setToken, setRefresh)
        .then(function(response){
            if(response.status === 200){
                setEmail(response.data.email)
                setDateJoined(moment.utc(response.data.date_joined).local().format('YYYY-MM-DD'));
                setUsername(response.data.username)
                setLoading(false)
            }
            else{
                ToastMessage("error", "An error occured")
                return
            }
        })
        .catch((error) => {
          return  ToastMessage("error", "An error occured")
            
        })
    }

    useEffect(() => {
      fetchUserInfo()
    }, [])


    const handleEditUsername = (e) => {
      e.preventDefault()
      navigate('/cuisine-owner/edit-username', { state: { username } })
  }

    const handleEditEmail = (e) => {
      e.preventDefault()
      navigate('/cuisine-owner/edit-email', { state: { email } })
  }
  
    return (
      <div className='account-container'> 
      {
        loading? <LoadingSpinner /> : 
        <div className='account-content w-300px bg-white'>
        <p className='text-center text-md font-medium'>Profile</p>
        {/* <div className='preferences-section'>
          <div className='preferences-header'>
            <p>User Preferences</p>
            <div
              onClick={() => handleSeePreferences()}
              className='toggle-icon'
            >
              {seePreferences ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </div>
          </div>
          <div className={`preferences-content ${seePreferences ? 'show' : 'hide'} ml-3`}>
            {preferenceList.map((category, index) => (
              <DisplayPreference category={category} key={index} id={index} />
            ))}
          </div>
        </div> */}
        <div>
        <div className='prefrences-section'>
          <div className='preferences-header'>
            <p>Account</p>
            <div
              onClick={() => handleSeeAccountInfo()}
              className='toggle-icon'
            >
              {seeAccountInfo ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </div>
            </div>
            <div className={`flex flex-col w-full ml-3 preferences-content ${seeAccountInfo ? 'show' : 'hide'}`}>
              <div className='flex justify-between preference-item'>
                  <p className='text-sm'>Email:</p>
                  <p className='text-end text-sm'>{email}</p>
              </div>
              <div className='flex justify-between preference-item'>
                  <p className='text-sm'>Username:</p>
                  <p className='text-end text-sm'>{username}</p>
              </div>
              <div className='flex justify-between preference-item'>
                  <p className='text-sm'>Date joined:</p>
                  <p className='text-end text-sm'>{dateJoined}</p>
              </div>
              <div className='flex flex-around w-full'>
                <button className= 'mb-4 mx-2 px-2 py-1 bg-blue-500 text-white ring-blue-400 focus:outline-none focus:ring-4 rounded-lg transition duration-300 poppins text-sm' onClick={(e) => handleEditUsername(e)}>Edit Username</button>
                <button className= 'mb-4 mx-2 px-2 py-1 bg-blue-500 text-white ring-blue-400 focus:outline-none focus:ring-4 rounded-lg transition duration-300 poppins text-sm' onClick={(e) => handleEditEmail(e)}>Edit Email</button>
              </div>
            </div>
          </div>
        </div>
        <button className='logout-button' onClick={handleLogout}>
          Logout
        </button>
      </div>
      }

      </div>
    );
  };
  
  const preferenceList = ['Appetizers', 'Main Courses', 'Side Dishes', 'Desserts', 'Beverages'];

  
  const DisplayPreference = ({ category, id }) => {
    const [check, setCheck] = useState(true);

    const usePreferences = usePreferenceList()

    const {
      appetizers,
      setAppetizers,
      mainCourses,
      setMainCourses,
      sideDishes,
      setSideDishes,
      desserts,
      setDesserts,
      beverages,
      setBeverages
    } = usePreferences

    const dishes = [appetizers, mainCourses, sideDishes, desserts, beverages]
    const setDishes = [setAppetizers, setMainCourses, setSideDishes, setDesserts, setBeverages]
  
    const handleCheckboxChange = (id) => {
      setDishes[id]((prevCheck) => !prevCheck);
    };
  
    return (
      <div className='preference-item'>
        <p className='text-sm'>{category}</p>
        <input type='checkbox' checked={dishes[id]} onChange={() => handleCheckboxChange(id)} />
      </div>
    );
  };