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
    <div>
        <p className='text-lg font-semibold poppins'>Reviews</p>
        <div className='poppins'>
        {
            loading? <p className='poppins'>Loading...</p> : reviews.length === 0 ? <p className='poppins'>Reviews will appear here</p>: reviews.map((review, index) => <p key={index} className='poppins'>{review}</p>)
        }
        </div>
        <div className='mt-5'>
            <Link to={`/cuisine/${cuisine_id}/add-review`} className='px-3 w-full py-2 bg-primary text-white ring-red-400 focus:outline-none focus:ring-4 mt-6 rounded-lg transition duration-300 poppins'>Add Review</Link>
        </div>
    </div>
  )
}
