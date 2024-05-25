import React from 'react'
import { CuisineTabs } from '../../cuisineownercomponents'

export const Map = () => {
  return (
    <div className="w-full h-full flex justify-around flex-col">
        <CuisineTabs />
        <div className='flex justify-around flex-col w-full h-screen align-center'>
            <p className='text-center'>Map</p>
        </div>
    </div>
  )
}
