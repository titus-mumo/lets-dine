import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useAuth } from '../hooks/AuthProvider';
import { ApiCall } from '../hooks/ApiCall';
import { ToastContainer } from 'react-toastify';
import { ToastMessage } from '../utils';
import 'react-toastify/dist/ReactToastify.css';

export const AddMenu = () => {
    const params = useParams();
    console.log(params)
    const [mealName, setMelName] = useState('')
    const [price, setPrice] = useState(1)
    const [category, setCategory] = useState('')
    const [image, setImage] = useState(null);

    const userAuth = useAuth();

    const {token, refresh, setToken, setRefresh} = userAuth

    const handleImageChange = (e) => {

        console.log(e.target.files)
        setImage(e.target.files[0]);
      };

    const handleAddItemToMenu = (e) => {
        e.preventDefault()

        const formData = new FormData();
        formData.append('cuisine_id', params.cuisine_id)
        formData.append('meal_name', mealName);
        formData.append('price', price);
        formData.append('category', category);
        formData.append('meal_pic', image);


        ApiCall('meals/', 'post', token, refresh, setToken, setRefresh, formData, {}, true)
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
    <div className='w-full h-full flex justify-around flex-col mt-10 lg:mt-0 items-center'>
        <ToastContainer />
        <div className="m-auto bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className=" p-3 space-y-4 md:space-y-3 sm:p-4 self-center">
          <h1 className="poppins text-md md:text-lg font-medium leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Add an item to menu
              </h1>
        <form className='space-y-4 md:space-y-6' onSubmit={(e) => handleAddItemToMenu(e)} encType="multipart/form-data">
        <div>
            <label htmlFor="mealname" className="poppins block mb-2 text-sm font-medium text-gray-900 dark:text-white">Meal name</label>
            <input type="text" name="mealname" id="mealname" value={mealName} onChange={(e) => setMelName(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-xs md:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="meal name" required></input>
        </div>
        <div>
            <label htmlFor="price" className="poppins block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Price (£)</label>
            <input type="number" name="price" id="price" value={price} onChange={(e) => setPrice(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-xs md:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="price" required></input>
        </div>
        <div>
            <label htmlFor="category" className="poppins block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Category
            </label>
            <select
                name="category"
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-xs md:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
            >
                <option value="" disabled>Select a category</option>
                <option value="Appetizers">Appetizer</option>
                <option value="Main Courses">Main Course</option>
                <option value="Side Dishes">Side Dishe</option>
                <option value="Desserts">Dessert</option>
                <option value="Beverages">Beverage</option>
            </select>
        </div>
        <div>
            <label htmlFor="image" className="poppins block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Image
            </label>
            <input
            type="file"
            name="image"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-xs md:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            />
        </div>

        <div className='flex justify-around flex-wrap items-center flex-row'>
        <button type='submit' className='m-2 px-4 py-2 bg-blue-500 text-white ring-blue-400 focus:outline-none focus:ring-2 mt-2 rounded-lg transition duration-300 poppins text-sm'>Add Item</button>
      <Link to={`/cuisine/${params.cuisine_id}/menu`} className='m-2 px-4 py-2 bg-blue-500 text-white ring-blue-400 focus:outline-none focus:ring-2 mt-2 rounded-lg transition duration-300 poppins text-sm'>Back</Link>
        </div>

        </form>
        </div>
        </div>
    </div>
  )
}
