import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useAuth } from '../hooks/AuthProvider';
import { ApiCall } from '../hooks/ApiCall';
import { ToastContainer } from 'react-toastify';
import { ToastMessage } from '../utils';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from './LandingPage';

export const AddReview = ({name, setAddReview}) => {
    const params = useParams();
    const [review, setReview] = useState('')
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate();
    const userAuth = useAuth();

    const handleDiscard = (e) => {
        e.preventDefault()
        setAddReview(false)
    }

    const {token, refresh, setToken, setRefresh} = userAuth

    const handleAddReview = (e) => {26
        e.preventDefault()
        const data = {
            review: review
        }
        ApiCall(`reviews/${params.cuisine_id}/`, 'post', token, refresh, setToken, setRefresh, data)
        .then(function(response){
            if(response.status === 201){
                ToastMessage("success", "Review added succssfully")
                setTimeout(() => {
                    navigate(`/cuisine/${params.cuisine_id}/menu`)
                }, 2000)
            }
        })
        .catch((error) => {
            console.log(error)
        }
        )
        .finally(() => {
            setAddReview(false)
            window.location.reload()
        }
        )

    }
  return (
    <div className='flex flex-col justify-center flex-wrap'>
        <ToastContainer />
        <div className="m-auto bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="m-auto p-2 space-y-2 md:space-y-3 sm:p-3">
          <h1 className="poppins text-sm text-md font-medium leading-tight tracking-tight text-gray-900 dark:text-white">
                Add Review to {name}
              </h1>
        <form className='space-y-2 md:space-y-3' onSubmit={(e) => handleAddReview(e)}>
        <div>
            <input type="text" name="review" id="review" value={review} onChange={(e) => setReview(e.target.value)} className="poppins bg-gray-50 border border-gray-300 text-gray-900 text-xs md:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="review" required></input>
        </div>

        <div className='flex justify-around flex-wrap items-center flex-row'>
        <button type='submit' className='m-1 px-2 py-1 bg-blue-500 text-white ring-blue-400 focus:outline-none focus:ring-2 mt-2 rounded-lg transition duration-300 poppins text-sm'>Add Review</button>
        <button onClick={(e) => handleDiscard(e)} className='m-1 px-3 py-1 bg-blue-500 text-white ring-blue-400 focus:outline-none focus:ring-2 mt-2 rounded-lg transition duration-300 poppins text-sm'>Discard</button>
        </div>

        </form>
        </div>
        </div>
    </div>
  )
}
