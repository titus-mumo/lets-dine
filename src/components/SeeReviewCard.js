import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAuth } from '../hooks/AuthProvider'
import { ApiCall } from '../hooks/ApiCall'

export const SeeReviewCard = ({cuisine_id}) => {
    const [reviews, setReviews] = useState([])
    const [loading, setLoading] = useState(true)
    const params = useParams()

    const userAuth = useAuth();
    const {refresh, token, setToken, setRefresh} = userAuth

    const getCuisineSpecificReviews = () => {
        ApiCall(`reviews/${params.cuisine_id}/`, 'get', token, refresh, setToken, setRefresh)
        .then(function(response){
            if(response.status === 200 && response.data.length > 0){
                const reviewsData = response.data.map((item) => item.review)
                console.log(reviewsData)
                setReviews(reviewsData)
                setLoading(false)
             } else if(response.status === 200 && response.data.length === 0){
                setLoading(false)
             }
        })
        .catch((error) => {
            console.log("An error occured, fetching reviews", error)
        });
    }

    useEffect(() => {
        getCuisineSpecificReviews()
    }, [])

  return (
    <div className='flex-flex-col justify-center'>
        <p className='text-lg font-semibold poppins text-center'>Reviews</p>
        <div className='poppins w-full flex flex-col justify-start'>
        {
            loading? <p className='poppins text-center'>Loading...</p> : reviews.length === 0 ? <p className='poppins text-center'>Reviews will appear here</p>: reviews.map((review, index) => <p key={index} className='poppins text-center'>{review}</p>)
        }
        </div>
        <div className='my-3 w-full flex justify-center'>
            <Link to={`/cuisine/${cuisine_id}/add-review`} className='px-3 text-center py-2 bg-primary text-white ring-red-400 focus:outline-none focus:ring-4 mt-6 rounded-lg transition duration-300 poppins'>Add Review</Link>
        </div>
    </div>
  )
}
