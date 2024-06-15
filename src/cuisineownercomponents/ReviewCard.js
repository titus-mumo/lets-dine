import React, { useEffect, useState } from 'react'
import { useAuth } from '../hooks/AuthProvider'
import { ApiCall } from '../hooks/ApiCall'
import LoadingSpinner from '../pages/LandingPage'

export const ReviewCard = ({cuisine_id}) => {
    const [reviews, setReviews] = useState([])
    const [loading, setLoading] = useState(true)

    const userAuth = useAuth();
    const {refresh, token, setToken, setRefresh} = userAuth

    const getCuisineSpecificReviews = () => {
        ApiCall(`reviews/${cuisine_id}/`, 'get', token, refresh, setToken, setRefresh)
        .then(function(response){
            if(response.status === 200 && response.data.length > 0){
                const reviewsData = response.data.map((item) => item.review)
                console.log(reviewsData)
                setReviews(reviewsData)
                setLoading(false)
                return
             } else if(response.status === 200 && response.data.length === 0){
                setLoading(false)
                return
             }
             throw new Error(response.data.error)
        })
        .catch((error) => {
            return ToastMessage("error", error.message? error.message || "Something went wrong": "An error occured fetching reviews")
        });
    }

    useEffect(() => {
        getCuisineSpecificReviews()
    }, [])

  return (
    <div className='flex justify-around w-full flex-col'>
        <p className='text-md font-medium poppins text-left'>Reviews</p>
        <div className='poppins flex justify-around w-full flex-col justify-start'>
        <ul>
        {
            loading? <LoadingSpinner /> : reviews.length === 0 ? <p className='poppins text-left text-sm'>Reviews will appear here</p>: reviews.map((review, index) => <li key={index} className='poppins text-left text-sm'>{review}</li>)
        }
        </ul>
        </div>
    </div>
  )
}