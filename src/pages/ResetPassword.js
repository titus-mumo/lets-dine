import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import { ToastMessage } from '../utils'
import axios from 'axios'

require('dotenv').config()


export const ResetPassword = () => {

    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const params = useParams()
    const token = params.token
    const uidb64 = params.uid

    const navigate = useNavigate()

    const handleResetPassword = (e) => {
        e.preventDefault()

        if(newPassword.length < 8) {
            ToastMessage('warning', "Password is too short")
            setTimeout(() => {
                navigate('/login')
            }, 2000)
            return;
        }
        if(newPassword !== confirmPassword){
            return ToastMessage('warning', "The passwords should be identical")
        }

        const data = {
            new_password: newPassword,
            confirm_password: confirmPassword
        }

        axios.post(process.env.BASE_URL + `reset-password/${uidb64}/${token}/`, data)
        .then(function(response){
            setConfirmPassword('')
            setNewPassword('')
            if(response.status === 200){
                return ToastMessage('success', 'Password has been changed successfully')
            }

            throw new Error(response.error)
        })
        .catch((error) => {
            return console.log("Something went wrong")
        })
    }


  return (
        <div className='w-full h-screen flex items-center justify-center'>
            <div className='w-full max-w-sm p-6 bg-white shadow-md rounded-md'>
                <p className='text-center text-xl font-bold mb-4'>Reset Password</p>
                <form onSubmit={(e) => handleResetPassword(e)} className='self-center'>
                    <div className='flex flex-col mb-4'>
                        <label htmlFor='new_password' className='mb-2'>New Password</label>
                        <input
                            type='password'
                            name='new_password'
                            id='new_password'
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder='New Password'
                            className='p-2 border border-gray-300 rounded'
                        />
                    </div>
                    <div className='flex flex-col mb-4'>
                        <label htmlFor='confirm_password' className='mb-2'>Confirm Password</label>
                        <input
                            type='password'
                            name='confirm_password'
                            id='confirm_password'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder='Confirm Password'
                            className='p-2 border border-gray-300 rounded'
                        />
                    </div>
                    <button
                        type='submit'
                        className='w-full bg-blue-500 text-white p-2 rounded mt-4'
                    >
                        Reset Password
                    </button>
                </form>
            </div>
        </div>

  )
}
