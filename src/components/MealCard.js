import React from 'react'

export const MealCard = ({meal}) => {
    const {cuisine_id, meal_id, meal_name} = meal
    const price = meal['price']
  return (
    <div>
        <p>{meal_name}</p>
        <p>{price}</p>
    </div>
  )
}
