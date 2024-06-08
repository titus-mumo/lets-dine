import React, { useEffect, useState } from 'react'
import burger from '../assets/burger.jpeg'
import { useAuth } from '../hooks/AuthProvider'
import { ApiCall } from '../hooks/ApiCall'
import { Link } from 'react-router-dom'

require('dotenv').config()

export const MealCard = ({meal, edit, setEdit, id}) => {
    const {cuisine, meal_id, meal_name, category} = meal
    let url;
    if(meal.meal_pic) {
      url = process.env.BASE_IMAGES + meal.meal_pic
    }
    const foodType = category
    const price = meal['price']
    const [loading, setLoading] = useState(true)
    const userAuth = useAuth();
    const {token, refresh, setToken, setRefresh} = userAuth
    const [cuisineName, setCuisineName] = useState('')

    const getCuisineName = () => {
      ApiCall(`cuisines/${cuisine}/`, 'get', token, refresh, setToken, setRefresh)
      .then(function(response){
        const {data, status} = response
        if(status === 200){
          setCuisineName(data.name)
          setLoading(false)
          return;
        }
        
      })
      .catch((error) => {
        return console.log("SOmething went wrong")
      });

    }

    useEffect(() => {getCuisineName()}, [cuisine])

    const handleEdit = (e) => {
      e.preventDefault()
      if(edit !== id){
        setEdit(meal_id)
      }else if(edit === id && editName === meal_name && price === editPrice){
        setEdit('')
      }else{
        setEdit('')
        //TODO: Edit meal
      }
    }

    const [editName, setEditName] = useState(meal_name)
    const [editPrice, setEditPrice] = useState(price)




  return (
      <div className={`hover:cursor-pointer border border-gray-100 transition transform duration-700 hover:shadow-xl p-1 rounded-lg relative flex flex-col mb-1 w-40 items-start justify-start ${edit === id?'scale-125 bg-gray-300': ''}`}>
          <span className="bg-red-100 border border-red-500 rounded-full text-primary text-sm poppins px-4 md:py-1  inline-block self-center mb-2">{foodType}</span>
          <div className="flex-grow flex justify-center mb-2">
              <img className="w-40 lg:w-64 mx-auto transform transition duration-300" src={meal.meal_pic ? url : burger} alt="" />
          </div>
          <div className="w-full flex flex-col items-center mt-auto space-y-2">
            {
              edit === id ? <input value={editName} onChange={(e) => setEditName(e.target.value)} type='text' className='w-full text-xs'></input> :
                          <h1 className="text-gray-900 poppins text-sm text-center">{meal_name}</h1>
            }
              
              <div className="w-full flex justify-between items-center px-2">
                  <div className="flex flex-row items-center">
                      {/* <p className="text-gray-500 poppins text-xs text-center mr-2">Cuisine: </p> */}
                      <Link to={`/cuisine/${cuisine}/menu`} className="text-blue-400 text-sm">
                          {loading ? 'Loading...' : cuisineName.includes(' ') ? `${cuisineName.split(' ')[0]}.. ` : cuisineName.length > 10 ? `${cuisineName.slice(0, 9)}..` : cuisineName}
                      </Link>
                  </div>
                  
                  {
                    edit === id ? <input value={editPrice} type='number' onChange={(e) => setEditPrice(e.target.value)} className='w-10 border-1 border-gray-900'></input> :<h2 className="text-gray-900 poppins text-md font-bold text-end">£{price}</h2>
                  }
              </div>
          </div>
          <div className='flex justify-between items-center w-full'>
            <p className={`${edit === id? 'text-green-700 text-sm font-medium p-1': 'text-green-500 text-sm p-1'}  hover:cursor-pointer transition duration-300`} onClick={(e) => handleEdit(e)}>
              {
                'Edit'
              }
            </p>
            <p onClick={() => setEdit('')} className={`${edit === id? '': 'hidden'} text-red-500 text-sm hover:cursor-pointer transition duration-300`}>Discard</p>
            <p className={`${edit === id? 'hidden': ''} text-red-500 text-sm hover:cursor-pointer transition duration-300`}>Delete</p>
          </div>
      </div>
  )
}

