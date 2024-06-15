import React from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ApiCall } from '../../hooks/ApiCall';
import { useAuth } from '../../hooks/AuthProvider';
import { Link } from 'react-router-dom';
import { ToastMessage } from '../../utils';

export const EditMenu = () => {
  const params = useParams();
  const location = useLocation()

  const {meal, cuisine_id}= location.state
  const {meal_name, price, category, meal_id} = meal
  const [editMealName, setMelName] = useState(meal_name)
  const [editPrice, setPrice] = useState(price)
  const [editCategory, setCategory] = useState(category)
  const [image, setImage] = useState(null);

  const navigate = useNavigate()

  const userAuth = useAuth();

  const {token, refresh, setToken, setRefresh} = userAuth

  const handleImageChange = (e) => {

      console.log(e.target.files)
      setImage(e.target.files[0]);
    };

  const handleEditItem = (e) => {

      e.preventDefault()

      if(meal_name === editMealName && editPrice === price && category === editCategory && image === null){
        return ToastMessage('info', "You have made no changes")
      }

      const formData = new FormData();
      formData.append('cuisine_id', cuisine_id)
      formData.append('meal_name', editMealName);
      formData.append('price', editPrice);
      formData.append('category', editCategory);
      if(image !== null){
        formData.append('meal_pic', image);
      }

      ApiCall(`meal/${meal_id}/`, 'put', token, refresh, setToken, setRefresh, formData, {}, image !== null?true:false)
      .then(function(response){
          const {status} = response
          if(status === 200){
              ToastMessage("success", "Item updated successfully")
              setTimeout(() => {
                navigate(`/cuisine-owner/cuisine/${cuisine_id}/menu`)
              }, 1000)
              return
          }
          throw new Error(response.data.error)

      })
      .catch((error) => {
          return ToastMessage("error", error.message? error.message: "Something went wrong")
      })


  }
return (
  <div className='w-full h-full flex justify-around flex-col mt-10'>
      <div className="m-auto bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="m-auto p-3 space-y-2 md:space-y-4 sm:p-6">
        <h1 className="poppins text-md md:text-lg font-semibold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Update Menu
            </h1>
      <form className='space-y-3 md:space-y-4' onSubmit={(e) => handleEditItem(e)} encType={image !==null? "multipart/form-data" : ''}>
      <div>
          <label htmlFor="mealname" className="poppins block mb-2 text-sm font-medium text-gray-900 dark:text-white">Meal name</label>
          <input type="text" name="mealname" id="mealname" value={editMealName} onChange={(e) => setMelName(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-xs md:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="meal name" required></input>
      </div>
      <div>
          <label htmlFor="price" className="poppins block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Price (£)</label>
          <input type="number" name="price" id="price" value={editPrice} onChange={(e) => setPrice(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-xs md:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="price" required></input>
      </div>
      <div>
          <label htmlFor="category" className="poppins block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Category
          </label>
          <select
              name="category"
              id="category"
              value={editCategory}
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
          />
      </div>

      <div className='flex justify-around flex-wrap items-center flex-row'>
      <button type='submit' className='m-2 px-4 py-2 bg-blue-500 text-white ring-blue-400 focus:outline-none focus:ring-2 mt-2 rounded-lg transition duration-300 poppins text-sm'>Edit Item</button>
      <Link to={`/cuisine-owner/cuisine/${cuisine_id}/menu`} className='m-2 px-4 py-2 bg-blue-500 text-white ring-blue-400 focus:outline-none focus:ring-2 mt-2 rounded-lg transition duration-300 poppins text-sm'>Back</Link>
      </div>

      </form>
      </div>
      </div>
  </div>
  )
}
