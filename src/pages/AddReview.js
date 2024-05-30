import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useAuth } from '../hooks/AuthProvider';
import { ApiCall } from '../hooks/ApiCall';
import { ToastContainer } from 'react-toastify';
import { ToastMessage } from '../utils';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from './LandingPage';

export const AddReview = () => {
    const params = useParams();
    const [review, setReview] = useState('')
    const [name, setName] = useState('')
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate();
    const userAuth = useAuth();

    const {token, refresh, setToken, setRefresh} = userAuth

    const getCuisineName = () => {
        ApiCall(`cuisines/${params.cuisine_id}/`, 'get', token, refresh, setToken, setRefresh)
        .then(function(response){
            setName(response.data.name)
            setLoading(false)
        })
        .catch((error) => {
            window.location.reload()
        })
    }

    useEffect(() => {
        setTimeout(() => {
          setLoading(false)
        }, 2000)
      }, [])
    
      if (loading){
        return <LoadingSpinner />
      }

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

    }
    useEffect(() => {
        getCuisineName()
    }, [])
  return (
    <div className='flex flex-col justify-center flex-wrap'>
        <ToastContainer />
        <p className='poppins my-6'>AddReview</p>
        <div className="m-auto bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="m-auto p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="poppins text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Add Review to {name}
              </h1>
        <form className='space-y-4 md:space-y-6' onSubmit={(e) => handleAddReview(e)}>
        <div>
            <label htmlFor="review" className="poppins block mb-2 text-sm font-medium text-gray-900 dark:text-white">Review</label>
            <input type="text" name="review" id="review" value={review} onChange={(e) => setReview(e.target.value)} className="poppins bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="review" required></input>
        </div>

        <div className='flex justify-around flex-wrap items-center flex-row'>
        <button type='submit' className='m-4 px-6 py-3 bg-primary text-white ring-red-400 focus:outline-none focus:ring-4 mt-6 rounded-lg transition duration-300 poppins'>Add Review</button>
        <Link to={`/cuisine/${params.cuisine_id}/menu`} className='m-4 px-6 py-3 bg-primary text-white ring-red-400 focus:outline-none focus:ring-4 mt-6 rounded-lg transition duration-300 poppins'>Back</Link>
        </div>

        </form>
        </div>
        </div>
    </div>
  )
}
