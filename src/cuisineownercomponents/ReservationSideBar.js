import React, { useState, useEffect } from 'react'

const ReturnName = ({ name }) => {
    
    return <p>{name}</p>
}

export const ReservationSideBar = ({sideBarNames}) => {
    return (
        <div className='mt-10'>
            <p>My Cuisines</p>
            <div>
                {sideBarNames.map((item, index) => <ReturnName key={index} name={item} />)}
            </div>
        </div>
    )
}
