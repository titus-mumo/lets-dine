import React from 'react'
import { useState } from 'react'
import { ToastMessage } from '../utils'
import { ApiCall } from '../hooks/ApiCall'
import { useAuth } from '../hooks/AuthProvider'
  
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

export const ChangePassword = () => {
    const navigate = useNavigate()
    const [oldPassword, setOldPassword]  = useState('')
    const [newPassword, setNewPassword]  = useState('')
    const [confirmPassword, setConfirmPassword]  = useState('')
    const isPasswordStrong = (password) => {
        // Basic strength check: length >= 8, contains number, and special character
        const lengthCheck = password.length >= 8;
        const numberCheck = /\d/.test(password);
        const specialCharCheck = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        return lengthCheck && numberCheck && specialCharCheck;
    };

    const userAuth = useAuth()
    const {token, refresh, setToken, setRefresh, logOut} = userAuth

    const handleChangePassword = (e) => {
        e.preventDefault()
        if(oldPassword.length < 8) return ToastMessage("warning", "Old password should be at least 8 characters long");
        if(newPassword.length < 8) return ToastMessage("warning", "New password should be at least 8 characters long");
        if (!isPasswordStrong(newPassword)) {
            return ToastMessage("warning", "New password is too weak. It should contain at least one number and one special character.");
        };
        if (newPassword !== confirmPassword) {
            return ToastMessage("warning", "New password and confirmation password do not match.");
        }

        const data = {
            old_password: oldPassword,
            new_password: newPassword
        }

        ApiCall('auth/changepassword/', 'post', token, refresh, setToken, setRefresh, data)
        .then(function(response){

            const {status, data} = response
            if(status === 200){
                setNewPassword('')
                setConfirmPassword('')
                setOldPassword('')
                ToastMessage("success", data.message || "Password changed successfully")
                setTimeout(() => {
                    navigate('/login')
                    setTimeout(() => {logOut()}, 1000)
                }, 2500)
            }else{
                throw new Error(response.data.error)
            }

        })
        .catch((error) => {
            return ToastMessage("error", error.message? error.message : "An error occured, can't change password")
        });

    }
  return (
    <div className='w-full flex justify-center'>
    <div className="bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
           
    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="poppins text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Change Password
        </h1>
        <form className="space-y-4 md:space-y-6" onSubmit={(e) => handleChangePassword(e)}>
            <div>
                <label htmlFor="old-password" className="poppins block mb-2 text-sm font-medium text-gray-900 dark:text-white">Old Password</label>
                <input onChange={(e) => setOldPassword(e.target.value)} value={oldPassword} type="password" name="old-password" id="old-password" className="poppins bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Old Password" required></input>
            </div>
            <div>
                <label htmlFor="new-password" className="poppins block mb-2 text-sm font-medium text-gray-900 dark:text-white">New Passsword</label>
                <input onChange={(e) => setNewPassword(e.target.value)} value={newPassword} type="password" name="new-password" id="new-password" className="poppins bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="New Password" required></input>
            </div>
            <div>
                <label htmlFor="confirm-password" className="poppins block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm new password</label>
                <input onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} type="password" name="confirm-password" id="confirm-password" className="poppins bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Confirm new password" required></input>
            </div>
            <div className='flex flex-col md:flex-row justify-around'>
                <button type='submit' className='m-4 poppins px-6 py-3 bg-primary text-white ring-red-400 focus:outline-none focus:ring-4 mt-6 rounded-lg transition duration-300'>Change Passsword</button>
                <Link to='/profile' className='poppins m-4 px-4 py-3 bg-primary text-white ring-red-400 focus:outline-none focus:ring-4 mt-6 rounded-lg transition duration-300'>Go Back</Link>
            </div>
        </form>
    </div>
    </div>
    </div>

  )
}
