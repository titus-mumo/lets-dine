// PasswordResetRequest.js
import React, { useState } from 'react';
import axios from 'axios';

export const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/reset-request/', { email })
    .then(function(response){
      setMessage(response.data.success);
    })
    .catch((error) => {
      console.log(error)
    })
  };

  return (
    <div className='flex flex-col justify-center items-center h-screen w-screen self-center border-2 border-gray-900'>
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
        <button type="submit">Send Reset Link</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};
