import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useAuth } from '../../hooks/AuthProvider';
import { ApiCall } from '../../hooks/ApiCall';
import { ToastContainer } from 'react-toastify';
import { ToastMessage } from '../../utils';
import 'react-toastify/dist/ReactToastify.css';

export const CuisineOwnerMenuAdd = () => {
    const params = useParams();
    const [mealName, setMelName] = useState('')
    const [price, setPrice] = useState(1)
    const [category, setCategory] = useState('')

    const userAuth = useAuth();

    const {token, refresh, setToken, setRefresh} = userAuth

    const handleAddItemToMenu = (e) => {
        e.preventDefault()
        const data = {
            cuisine_id : params.cuisine_id,
            meal_name : mealName,
            price: price,
            category: category
        }

        ApiCall('meals/', 'post', token, refresh, setToken, setRefresh, data)
        .then(function(response){
            const {status} = response
            if(status === 201){
                return ToastMessage("success", "Item added to menu successfully")
            }

        })
        .catch((error) => {
            return ToastMessage("error", "Something went wrong")
        })


    }
  return (
    <div className='flex flex-col justify-center flex-wrap'>
        <ToastContainer />
        <p className='poppins my-6'>AddMenu</p>
        <div className="m-auto bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="m-auto p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="poppins text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Add an item to menu
              </h1>
        <form className='space-y-4 md:space-y-6' onSubmit={(e) => handleAddItemToMenu(e)}>
        <div>
            <label htmlFor="mealname" className="poppins block mb-2 text-sm font-medium text-gray-900 dark:text-white">Meal name</label>
            <input type="text" name="mealname" id="mealname" value={mealName} onChange={(e) => setMelName(e.target.value)} className="poppins bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="meal name" required></input>
        </div>
        <div>
            <label htmlFor="price" className="poppins block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Price</label>
            <input type="number" name="price" id="price" value={price} onChange={(e) => setPrice(e.target.value >= 0.5? e.target.value: 0.5)} className="poppins bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="price" required></input>
        </div>
        <div>
            <label htmlFor="category" className="poppins block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Category</label>
            <input type="text" name="category" id="category" value={category} onChange={(e) => setCategory(e.target.value)} className="poppins bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="category" required></input>
        </div>

        <div className='flex justify-around flex-wrap items-center flex-row'>
        <button type='submit' className='m-4 px-6 py-3 bg-primary text-white ring-red-400 focus:outline-none focus:ring-4 mt-6 rounded-lg transition duration-300 poppins'>Add Item</button>
        <Link to={`/cuisine-owner/cuisine/${params.cuisine_id}/menu`} className='m-4 px-6 py-3 bg-primary text-white ring-red-400 focus:outline-none focus:ring-4 mt-6 rounded-lg transition duration-300 poppins'>Back</Link>
        </div>

        </form>
        </div>
        </div>
    </div>
  )
}
