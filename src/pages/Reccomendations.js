import React, { useEffect } from 'react'
import { useState } from 'react'

import { RecommendedCuisines } from './RecommendedCuisines'
import { RecommendedFoods } from './RecommendedFoods'

import LoadingSpinner from './LandingPage'
require('dotenv').config()


export const Reccomendations = () => {
  const [recommedationTab, setRecommendationTab] = useState('cuisines')
  const [loading, setLoading] = useState(true)
  const [item, setItem] = useState(0)
  
  useEffect(() => {
    setLoading(false)
  }, [item])
  return (
    <div className="w-full h-full flex justify-around flex-col mt-20 lg:mt-0 pt-2 lg:pt-0 px-2 w-full md:px-3 lg:px-4 ">
      {
        loading? <LoadingSpinner />:
        <div className=' w-full justify-around flex flex-col self-center'>
        <div className="z-10000 fixed lg:relative flex items-center justify-center py-2 w-full lg:w-2/3 top-10 lg:top-0 bg-stone-700 self-center">
            <p className={recommedationTab === 'cuisines' ? "active_menu_tab poppins text-sm md:text-base bg-blue-500 py-0.5 px-2" : "menu_tab text-xs md:text-sm px-2 py-1 poppins "} onClick={() => setRecommendationTab('cuisines')}>Cuisines</p>
            <p className={recommedationTab === 'dishes' ? "active_menu_tab poppins text-sm md:text-base bg-blue-500 py-0.5 px-2" : "menu_tab text-xs md:text-sm px-2 py-1 poppins "} onClick={() => setRecommendationTab('dishes')}>Dishes</p>
        </div>

        {
           recommedationTab === 'cuisines'? <RecommendedCuisines setItem={setItem} /> : <RecommendedFoods setItem={setItem} />
        }

      </div>
      }
  </div>
  )
}





