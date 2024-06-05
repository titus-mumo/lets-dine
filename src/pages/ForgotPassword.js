// PasswordResetRequest.js
import React, { useState } from 'react';
import axios from 'axios';
require('dotenv').config()

export const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios.post(process.env.BASE_URL + 'reset-request/', { email })
    .then(function(response){
      setMessage(response.data.success);
      setEmail('')
    })
    .catch((error) => {
      console.log(error)
    })
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
      />
      <button
        type="submit"
        className='w-full bg-blue-500 text-white p-2 rounded'
      >
        Send Reset Link
      </button>
    </form>
    {message && <p className='text-center text-green-500 mt-4'>{message}</p>}
  </div>
</div>

  );
};
