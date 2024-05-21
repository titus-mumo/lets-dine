import React, { useState } from 'react'
import { ApiCall } from '../../hooks/ApiCall'
import { useAuth } from '../../hooks/AuthProvider'
import { ToastMessage } from '../../utils'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

export const NewCuisine = () => {

    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [address, setAddress] = useState('')
    const [contact, setContact] = useState('')
    const [website, setWebsite] = useState('')
    const [timeOpen, setTimeOpen] = useState('')

    const userAuth = useAuth()

    const {token, refresh, setToken, setRefresh} = userAuth

    const handleUploadCuisine = (e) => {
        e.preventDefault()

        const data = {
            name: name,
            description: description,
            address: address,
            contact: contact,
            website: website,
            time_open: timeOpen
        }
        ApiCall('cuisines/', 'post', token, refresh, setToken, setRefresh, data)
        .then(function(response){
            if(response.status === 201){
                ToastMessage("success", "Cuisine uploaded successfully")
                setTimeout(() => {navigate('/cuisine-owner/home')}, 2000)
            }else{
                throw new Error(response)
            }
        })
        .catch((error) => {
            return console.log("An error occured, new cuisine")
        });
    }

  return (
    <div className='w-full flex justify-center h-screen items-center'>
    <div className="w-auto bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
    <h1 className="poppins text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
        Add Cuisine here
        </h1>
              <form className='space-y-4 md:space-y-6' onSubmit={(e) => handleUploadCuisine(e)}>
              <div>
                <label htmlFor="name" className="poppins block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Name of the cuisine</label>
                <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} className="poppins bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name" required></input>
              </div>
              <div>
                <label htmlFor="desciption" className="poppins block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Description</label>
                <input type="text" name="description" id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="poppins bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="description" required></input>
              </div>
              <div>
                <label htmlFor="address" className="poppins block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
                <input type="text" name="addess" id="address" value={address} onChange={(e) => setAddress(e.target.value)} className="poppins bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="address" required></input>
              </div>
              <div>
                <label htmlFor="contact" className="poppins block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contact</label>
                <input type="mobile" name="contact" id="contact" value={contact} onChange={(e) => setContact(e.target.value)} className="poppins bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="+ 254 701 901 186" required></input>
              </div>
              <div>
                <label htmlFor="website" className="poppins block mb-2 text-sm font-medium text-gray-900 dark:text-white">Website</label>
                <input type="text" name="website" id="website" value={website} onChange={(e) => setWebsite(e.target.value)} className="poppins bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="www.ethniceats.com" required></input>
              </div>
              <div>
                <label htmlFor="time-open" className="poppins block mb-2 text-sm font-medium text-gray-900 dark:text-white">Time Open</label>
                <input type="text" name="time-open" id="time-open" value={timeOpen} onChange={(e) => setTimeOpen(e.target.value)} className="poppins bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="6:00am - 10:00pm" required></input>
              </div>
              <div className='flex flex-col md:flex-row justify-around'>
            <div className='flex jsutify-around flex-wrap items-center'>
              <button type='submit' className='m-4 poppins px-6 py-3 bg-primary text-white ring-red-400 focus:outline-none focus:ring-4 mt-6 rounded-lg transition duration-300'>Add Cuisine</button>
              <Link to='/cuisine-owner/home' className='m-4 poppins px-6 py-3 bg-primary text-white ring-red-400 focus:outline-none focus:ring-4 mt-6 rounded-lg transition duration-300'>Go back</Link>
              </div>
          </div>
              </form>
          </div>
          </div>
          </div>
  )
}
