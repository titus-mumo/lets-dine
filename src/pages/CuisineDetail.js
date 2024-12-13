import React, { useEffect, useState } from 'react'
import { useParams, Link, useLocation, useNavigate } from 'react-router-dom'
import { ToastMessage } from '../utils';
import { MealCard, SeeReviewCard } from '../components';
import { useAuth } from '../hooks/AuthProvider';
import { ApiCall } from '../hooks/ApiCall';
import { AddReview } from './AddReview';
import LoadingSpinner from './LandingPage';
import { LockClock } from '@mui/icons-material';
import { Call, LocationOnOutlined } from '@mui/icons-material';
import moment from 'moment';

export const CuisineDetail = () => {
    const location = useLocation();
    const params = useParams(location.pathname);
    const [addReview, setAddReview] = useState(false)
    const [loading, setLoading] = useState(true)

    const user = useAuth()
    const {token, refresh, setToken, setRefresh} = user

    const [cuisineMenu, setCuisineMenu] = useState([])
    const [cuisineInfo, setCuisineInfo] = useState('')

    const {cuisine_id, contact, description,name, time_open, time_close} = cuisineInfo

    const fetchCuisineMenu = async() => {
        let diateryPreference = localStorage.getItem("diatery preference")
        if(diateryPreference === null || diateryPreference.length === 0){
          diateryPreference = 'all'
        }
        ApiCall(`cuisines/${params.cuisine_id}/menu?diateryPreference=${diateryPreference}`, 'get', token, refresh, setToken, setRefresh)
        .then(function(response){
            const {status, data} = response
            if(status === 200){
                setCuisineMenu(data)
            }else{
                throw new Error(response.data.error)
            }
        })
        .catch((error) => {
            ToastMessage(error.message? error.message: "An error occured")
        });
    }
    const fetchCuisineInfo = async() => {
        ApiCall(`cuisines/${params.cuisine_id}/`, 'get', token, refresh, setToken, setRefresh)
        .then(function(response){
            const {status, data} = response
            if (status === 200) {
                setCuisineInfo(data)
                setLoading(false)
            }
        })
        .catch((error) => {
            ToastMessage(error.message? error.message: "An error occured")
        });
    }

    useEffect(() => {
        fetchCuisineMenu()
        fetchCuisineInfo()
    }, [params.cuisine_id])

    const handleAddReview = (e) => {
        e.preventDefault()
        setAddReview(true)
    }


    const [rateFood, setRateFood] = useState('')
    const [rateNumber, setRateNumber] = useState('')
    const [clickedId, setClickedId] = useState('') 

  return (
    <div className='mt-10 lg:mt-0 flex flex-col justify-center w-full self-center'>
        {
            loading? <LoadingSpinner />:
            <div className='flex flex-col justify-center w-full lg:w-900px self-center px-1.5'>
            <div className='mb-1 flex flex-col justify-center w-full'>
                <p className='poppins font-medium text-md md:text-lg text-center'>{name}</p>
                <p className='poppins text-left text-sm md:text-md'>{description}</p>
                <div className='flex flex-col justify-start self-center w-250px md:w-300px'>
                    <div className='flex items-center'>
                        <LocationOnOutlined />
                        <p className='popins text-center ml-3 text-sm'>{cuisineInfo.location}</p>
                    </div>
                    <div className='flex items-center'>
                        <Call />
                        <p className='popins text-center ml-3 text-sm'>{contact}</p>
                    </div>
                    <div className='flex items-center'>
                        <LockClock />
                        <p className='poppins text-center ml-3 text-sm'>{moment(time_open, "HH:mm:ss").format("HH:mm")} - {moment(time_close, "HH:mm:ss").format("HH:mm")}</p>
                    </div>
                </div>

                <RateContainer rateFood={rateFood} setRateFood={setRateFood} clickedId={clickedId} setClickedId={setClickedId} rateNumber={rateNumber} setRateNumber={setRateNumber}  />

            </div>
            <div className='flex justify-around w-full'>
            <Link to={`/cuisine/${cuisine_id}/menu/add`} className='mx-1 px-3 py-1 bg-blue-500 text-white ring-blue-400 focus:outline-none focus:ring-2 rounded-lg transition duration-300 poppins text-md'>Add Item</Link>
                <Link to='/cuisines' className='mx-1 px-3 py-1 bg-blue-500 text-white ring-blue-400 focus:outline-none focus:ring-2 rounded-lg transition duration-300 poppins text-md'>Back</Link>
            </div>
            <div className='mt-3'>
                <div className='flex flex-wrap justify-start md:justify-around'>
                {
                    cuisineMenu.length === 0? <p className='text-sm md:text-md text-center'>No items on the menu yet<br></br>Try turning your diatery preferences under profile section</p>:cuisineMenu.map(item => <MealCard key={item.meal_id} meal={item} setRateFood={setRateFood} setRateNumber={setRateNumber} setClickedId={setClickedId}/>)
                }
                </div>
            </div>
            <div className='my-2'>
                <SeeReviewCard cuisine_id = {cuisine_id}/>
            </div>
            <div className='my-3 w-full flex justify-center'>
                {
                    addReview? <AddReview name={name} setAddReview={setAddReview}/>:
                    <button onClick={(e)=> handleAddReview(e)} className='m-1 px-3 py-1 bg-blue-500 text-white ring-blue-400 focus:outline-none focus:ring-2 mt-2 rounded-lg transition duration-300 poppins'>Add Review</button>

                }
            </div>
        </div>
        }
    </div>
  )
}


const RateContainer = ({rateFood, setRateFood, clickedId, setClickedId, rateNumber, setRateNumber}) => {
    const userAuth = useAuth()
    const {token, refresh,setToken, setRefresh} = userAuth
    const handleYes = (e) => {
      e.preventDefault()
      const data = {
        meal_id: clickedId,
        rating: rateNumber,
      }

      ApiCall('rate/', 'post', token, refresh, setToken, setRefresh, data)
      .then((response) => {
        if(response.status === 200){
            ToastMessage("success", "Rating has been recorded")
            return
        }
        throw new Error(response.data.error)
      })
      .catch((error) => {
        ToastMessage("error", error.message? error.message: "An error occured")
      })
      .finally(() => {
        setClickedId('')
        setRateFood('')
        setRateNumber('')
      })
    }
    const handleNo = (e) => {
      e.preventDefault()
      setClickedId('')
      setRateFood('')
      setRateNumber('')
  
    }
  
    return(
      <div className={`z-100000 fixed centered-d centered-div ${clickedId? "block": "hidden"} bg-gray-900 text-white px-2 py-1 rounded-md`}>
        <p>Give {rateFood} a rating of {rateNumber}?</p>
        <div className='flex justify-around'>
          <p onClick={(e) => handleYes(e)}>Yes</p>
          <p onClick={(e) => handleNo(e)}>No</p>
        </div>
      </div>
    )
  
  }
