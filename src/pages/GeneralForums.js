import React, { useEffect, useState } from 'react'
import { ApiCall } from '../hooks/ApiCall'
import { useAuth } from '../hooks/AuthProvider'
import { AddBox } from '@mui/icons-material'

//TODO: Forums

export const GeneralForums = () => {
  const [forums, setForums] =useState([])
  const [loading, setLoading] = useState(true)

  const userAuth = useAuth()
  
  const {token, refresh, setRefresh, setToken} = userAuth

  const getForums = () => {
    ApiCall('forums/all', 'get', token, refresh, setToken, setRefresh)
    .then(function(response){
      if(response.status === 200){
        console.log(response.data)
        if(response.data.length > 0){
          setForums(response.data)
        }
      }else{
        console.log("error fetching forums")
      }
      setLoading(false)
    })
    .catch((error) => {
      console.log(error)
    })
  }
  useEffect(() => {
    getForums()
  }, [])
  return (
    <div className='w-full h-screen flex justify-around flex-col-reverse l mt-10 lg:mt-0 content-start pt-2 lg:pt-0'>
      <div className='w-full lg:w-2/3 lg:mt-10 lg:mx-4 mb-5 flex justify-end'>
        <p className='w-9 text-center text-3xl font-semibold rounded-full bg-blue-500 transition hover:scale-125 hover:cursor-pointer'>+</p>
        </div>
      <div className='w-full h-screen flex justify-around flex-col '>
      {
        loading? <p className='text-center'>Loading</p>: forums.length === 0? <p className='text-center'>New forums will appear here</p> : forums.map((item, index) => <ForumCard key={index} forum={item} />)
      }
      </div>

    </div>
  )
}


const ForumCard = ({forum}) => {
  return(
    <div className='mx-2 w-full rounded-md shadow-md lg:w-2/3 flex items-center'>
      <div className='basis-4/5'>
      <p className='font-medium'>{forum.title}</p>
       <p>{forum.description}</p>
      </div>
      <div className='pr-3 text-right basis-1/5 hover:cursor-pointer'>
        <AddBox />
      </div>
    </div>
  )
}