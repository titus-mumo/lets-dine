import React, { useState, useRef, useEffect } from 'react'
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
    const [timeClose, setTimeClose] = useState('')
    const [image, setImage] = useState(null)
 
    const [locationGeometry, setLocationGeometry] = useState({
      latitude: null,
      longitude: null
    })

    const [location, setLocation] = useState('')
    const locationInputRef = useRef(null);

    const userAuth = useAuth()

    const {token, refresh, setToken, setRefresh} = userAuth

    const handleImageChange = (e) => {

      console.log(e.target.files)
      setImage(e.target.files[0]);
    };


    useEffect(() => {
      if (window.google) {
          const autocomplete = new window.google.maps.places.Autocomplete(locationInputRef.current, {
              types: ['address'],
              componentRestrictions: { country: 'uk' }, // restrict to specific country if needed
          });

          autocomplete.addListener('place_changed', () => {
              const place = autocomplete.getPlace();
              if (place.geometry) {
                  setLocation(place.formatted_address);
                  setLocationGeometry({
                    latitude: place.geometry.location.lat(),
                    longitude: place.geometry.location.lng()
                  })
              }
          });
      }
  }, []);

    const handleUploadCuisine = (e) => {
        e.preventDefault()

        console.log(locationGeometry)

        const formData = new FormData()
        formData.append('name', name)
        formData.append('description', description)
        formData.append('location', location)
        formData.append('address', address)
        formData.append('contact', contact)
        formData.append('website', website)
        formData.append('time_open', timeOpen)
        formData.append('time_close', timeClose)
        formData.append('location_geometry', JSON.stringify(locationGeometry))
        formData.append('cuisine_pic', image)

        ApiCall('cuisines/', 'post', token, refresh, setToken, setRefresh, formData)
        .then(function(response){
            if(response && response.status === 201){
                ToastMessage("success", "Cuisine uploaded successfully")
                setTimeout(() => {navigate('/cuisine-owner/home')}, 2000)
            }else{
                throw new Error(response)
            }
        })
        .catch((error) => {
          console.group(error)
            console.log("An error occured, new cuisine")
            ToastMessage("error", error.message || error.response.error.detail)
        });
    }

  return (
    <div className='w-full flex justify-center h-screen items-center'>
    <div className="w-auto bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
    <div className="p-4 space-y-2 md:space-y-4 sm:p-6">
    <h1 className="poppins text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
        Add Cuisine here
        </h1>
              <form className='space-y-2 md:space-y-4' onSubmit={(e) => handleUploadCuisine(e)}>
              <div>
                {/* <label htmlFor="name" className="poppins block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Name of the cuisine</label> */}
                <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} className="poppins bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="cuisine name" required></input>
              </div>
              <div>
                {/* <label htmlFor="desciption" className="poppins block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Description</label> */}
                <input type="text" name="description" id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="poppins bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="description" required></input>
              </div>
              <div>
                {/* <label htmlFor="location" className="poppins block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Location</label> */}
                <input ref={locationInputRef} type="text" name="location" id="location" value={location} onChange={(e) => setLocation(e.target.value)} className="poppins bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="location" required></input>
              </div>
              <div>
                {/* <label htmlFor="address" className="poppins block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label> */}
                <input type="text" name="addess" id="address" value={address} onChange={(e) => setAddress(e.target.value)} className="poppins bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="address" required></input>
              </div>
              <div>
                {/* <label htmlFor="contact" className="poppins block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contact</label> */}
                <input type="mobile" name="contact" id="contact" value={contact} onChange={(e) => setContact(e.target.value)} className="poppins bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="phone number" required></input>
              </div>
              <div>
                {/* <label htmlFor="website" className="poppins block mb-2 text-sm font-medium text-gray-900 dark:text-white">Website</label> */}
                <input type="text" name="website" id="website" value={website} onChange={(e) => setWebsite(e.target.value)} className="poppins bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="cuisine website" required></input>
              </div>
              <div>
                <p className='text-white pb-1'>Operating hours</p>
                <div className='flex justify-between items-center'>
                <p className='pr-2 text-white'>from</p>
                  {/* <label htmlFor="time-open" className="poppins block mb-2 text-sm font-medium text-gray-900 dark:text-white">Time Open</label> */}
                  <input type="time" name="time-open" id="time-open" value={timeOpen} onChange={(e) => setTimeOpen(e.target.value)} className="poppins bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Opening time" required></input>
                  <p className='px-2 text-white'>to</p>
                  <input type="time" name="time-close" id="time-close" value={timeClose} onChange={(e) => setTimeClose(e.target.value)} className="poppins bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Closing time" required></input>
                </div>
              </div>
              <div>
                <label htmlFor="image" className="poppins block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Cuisine Image
                </label>
                <input
                type="file"
                name="image"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
                className="poppins bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                />
            </div>
              <div className='flex flex-col md:flex-row justify-around'>
            <div className='flex jsutify-around flex-wrap items-center'>
              <button type='submit' className='m-2 poppins px-6 py-2 bg-primary text-white ring-red-400 focus:outline-none focus:ring-4 mt-3 rounded-lg transition duration-300'>Add Cuisine</button>
              <Link to='/cuisine-owner/home' className='m-2 poppins px-6 py-2 bg-primary text-white ring-red-400 focus:outline-none focus:ring-4 mt-3 rounded-lg transition duration-300'>Go back</Link>
              </div>
          </div>
              </form>
          </div>
          </div>
          </div>
  )
}
