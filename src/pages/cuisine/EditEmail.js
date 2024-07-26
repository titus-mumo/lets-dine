import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/AuthProvider'
import { ApiCall } from '../../hooks/ApiCall'
import { ToastMessage } from '../../utils'

export const EditCuisineOwnerEmail = () => {

    const userAuth = useAuth()

    const navigate = useNavigate()

    const {token, refresh, setToken, setRefresh} = userAuth

    const location = useLocation()
    const {email} = location.state

    const [newEmail, setNewEmail] = useState(email)

    const handleEditEmail = (e) => {
        const data = {
            email: newEmail
        }
        e.preventDefault()
        ApiCall('auth/edit-email/', 'post', token, refresh, setToken, setRefresh, data)
        .then((response) => {
            if(response.status && response.status === 200){
                ToastMessage('success', "Email editted successfully")
                setTimeout(() => {
                    navigate('/cuisine-owner/account')
                }, 2000)
                return
            }
            throw new Error(response.data.message)
        })
        .catch((error) => {
            ToastMessage('error', error.message? error.message : "An error occured")
        })
    }
  return (
    <div className="w-full h-full flex justify-around flex-col mt-20 lg:mt-0 pt-2 lg:pt-0 px-2 w-full md:px-3 lg:px-4 ">
        <div className="w-full self-center bg-white rounded-lg shadow dark:border mt-3 md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-2 self-center space-y-2 md:space-y-3 sm:p-4 ">
          <h1 className=" text-md md:text-lg font-medium leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Edit Profile Details
              </h1>
                    <form className='space-y-4 md:space-y-6' onSubmit={(e) => handleEditEmail(e)}>
                    <div>
                      <label htmlFor="email" className="block mb-1 text-xs md:text-sm font-medium text-gray-900 dark:text-white">Email</label>
                      <input type="email" name="email" id="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} className="poppins bg-gray-50 border border-gray-300 text-gray-900 text-xs md:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="example@gmail.com" required></input>
                    </div>
                    <div className='flex flex-row justify-around'>
                        <div className='flex flex-center m-auto'>
                            <button type='submit' className='m-2 poppins px-2 py-1.5 bg-blue-500 text-white text-sm ring-blue-400 focus:outline-none focus:ring-2 mt-3 rounded-lg transition duration-300'>Edit Email</button>
                        </div>
                        <div className='flex flex-center m-auto'>
                        <Link to='/account' className='poppins m-2 px-2 py-1.5 bg-blue-500 text-sm  text-white ring-blue-400 focus:outline-none focus:ring-2 mt-3 rounded-lg transition duration-300 text-center'>Back</Link>
                        </div>
                </div>
                    </form>
                </div>
                </div>
    </div>
  )
}