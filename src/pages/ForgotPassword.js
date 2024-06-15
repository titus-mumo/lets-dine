import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
require('dotenv').config()
import LoadingSpinner from './LandingPage';

export const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const url = window.location.href;
  const base_url = url.split(window.location.pathname)[0];
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    console.log(base_url)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    axios.post(process.env.BASE_URL + 'reset-request/', { email, base_url })
    .then(function(response){
      setMessage(response.data.success);
      setEmail('')
    })
    .catch((error) => {
      ToastMessage(error.message? error.message: "An error occured")
    })
    .finally(
      setLoading(false)
    )
  };

  return (
<div className='flex flex-col justify-center items-center h-screen w-screen'>
  <div className='w-full max-w-sm p-6 bg-white shadow-md rounded-md border-2 border-gray-900'>
    <h2 className='text-center text-xl font-bold mb-4'>Reset Password</h2>
    <form onSubmit={handleSubmit} className='flex flex-col'>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        required
        className='p-2 border border-gray-300 rounded mb-4'
      />{
        loading?<LoadingSpinner/>:
        <button
        type="submit"
        className='w-full bg-blue-500 text-white p-2 rounded'
      >
        Send Reset Link
      </button>
      }

      <Link to='/login'
        className='w-full bg-blue-500 text-white mt-3 p-2 text-center rounded'
      >
        Go back
      </Link>
    </form>
    {message && <p className='text-center text-green-500 mt-4'>{message}</p>}
  </div>
</div>

  );
};
