import React from 'react'
import { CuisineTabs } from '../cuisineownercomponents'
import { useState } from 'react'

export const Reccomendations = () => {
  const [recommedationTab, setRecommendationTab] = useState('cuisines')
  return (
    <div className="w-full h-full flex justify-around flex-col mt-10 lg:mt-0  pt-2 lg:pt-0 px-2 w-full md:px-3 lg:px-4 ">
    <CuisineTabs />
    <div className=' w-full justify-around flex'>
      <div className="z-10000 fixed lg:relative flex items-center justify-center py-2 w-full lg:w-2/3 top-10 lg:top-0 rounded-md bg-slate-900">
          <p className={recommedationTab === 'cuisines' ? "active_menu_tab poppins bg-primary px-2 py-1" : "menu_tab px-2 py-1 poppins "} onClick={() => setRecommendationTab('cuisines')}>Cuisines</p>
          <p className={recommedationTab === 'dishes' ? "active_menu_tab poppins bg-primary px-2 py-1" : "menu_tab px-2 py-1 poppins "} onClick={() => setRecommendationTab('dishes')}>Dishes</p>
      </div>
    </div>
  </div>
  )
}
