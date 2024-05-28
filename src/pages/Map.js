import React from 'react'
import { CuisineTabs } from '../cuisineownercomponents';

export const MapUser = () => {
  return (
    <div className="w-full h-full flex justify-around flex-col mt-10 lg:mt-0  pt-2 lg:pt-0 px-2 w-full md:px-3 lg:px-4 ">
      <CuisineTabs />
        <div className='flex justify-around flex-col w-full h-full align-center'>
            <p className='text-center'>Map</p>
        </div>
    </div>
  )
}
