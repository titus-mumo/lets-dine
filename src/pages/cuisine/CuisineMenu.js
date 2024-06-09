import React, { useEffect, useState } from 'react'
import { useParams, Link, useLocation, useNavigate } from 'react-router-dom'
import { ToastMessage } from '../../utils';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MealCard } from '../../cuisineownercomponents';
import { useAuth } from '../../hooks/AuthProvider';
import { ApiCall } from '../../hooks/ApiCall';
import LoadingSpinner from '../LandingPage';
import { ReviewCard } from '../../cuisineownercomponents';

export const CuisineMenu = () => {
    const location = useLocation();
    const params = useParams(location.pathname);
    const [loading, setLoading] = useState(true)

    const user = useAuth()
    const {token, refresh, setToken, setRefresh} = user

    const [cuisineMenu, setCuisineMenu] = useState([])
    const [cuisineInfo, setCuisineInfo] = useState('')
    const [edit, setEdit] = useState('')
    const [confirmDelete, setConfirmDelete] = useState(false)
    const [deleteMealName, setDeleteMealName] = useState('')

    const [deleteMealId, setDeleteMealId] = useState('')

    const {cuisine_id, contact, description,name, time_open} = cuisineInfo

    const fetchCuisineMenu = async() => {
        ApiCall(`cuisines/${params.cuisine_id}/menu`, 'get', token, refresh, setToken, setRefresh)
        .then(function(response){
            const {status, data} = response
            if(status === 200){
                setCuisineMenu(data)
            }
        })
        .catch((error) => {
            console.log('error')
        });
    }
    const fetchCuisineInfo = async() => {
        ApiCall(`cuisines/${params.cuisine_id}/`, 'get', token, refresh, setToken, setRefresh)
        .then(function(response){
            const {status, data} = response
            if (status === 200) {
                setCuisineInfo(data)
                setLoading(false)
            }
        })
        .catch((error) => {
            
        });
    }

    useEffect(() => {
        fetchCuisineMenu()
        fetchCuisineInfo()
    }, [params.cuisine_id])

  return (
    <div className={`mt-10 lg:mt-0 flex flex-col justify-center w-full self-center ${confirmDelete? '':''}`}>
        {
            loading? <LoadingSpinner />:
            <div className='flex flex-col justify-center w-full lg:w-900px self-center mt-2 lg:mt-0'>
            <div className='mb-1 flex flex-col justify-center w-full'>
                <p className='poppins font-semibold text-lg text-center'>{name}</p>
                <p className='poppins text-center text-sm'>{description}</p>
                <p className='popins text-center'>{contact}</p>
                <p className='poppins text-center'>{time_open}</p>
            </div>
            <div className='flex justify-around w-full'>
            <Link to={`/cuisine-owner/cuisine/${cuisine_id}/menu/add`} className='mx-1 px-3 py-1 bg-blue-500 text-white ring-blue-400 focus:outline-none focus:ring-2 rounded-lg transition duration-300 poppins'>Add Item</Link>
                <Link to='/cuisine-owner/cuisines' className='mx-1 px-3 py-1 bg-blue-500 text-white ring-blue-400 focus:outline-none focus:ring-2 rounded-lg transition duration-300 poppins'>Back</Link>
            </div>
            <DeletePopUp confirmDelete={confirmDelete} setConfirmDelete={setConfirmDelete} deleteMealName={deleteMealName} setDeleteMealName={setDeleteMealName} deleteMealId={deleteMealId} />
            <div className='mt-3'>
                <div className='flex flex-wrap justify-around'>
                {
                    cuisineMenu.length > 0?cuisineMenu.map((item) => <MealCard key={item.meal_id} id={item.meal_id} meal={item} confirmDelete={confirmDelete} setConfirmDelete={setConfirmDelete} setDeleteMealName={setDeleteMealName} setDeleteMealId={setDeleteMealId}/>): <p className='text-sm text-center'>No items on the menu yet</p>
                }
                </div>
            </div>
            <div className='m-2'>
                <ReviewCard cuisine_id = {cuisine_id}/>
            </div>
        </div>
        }
    </div>
  )
}


const DeletePopUp = ({confirmDelete, setConfirmDelete, deleteMealName, setDeleteMealName, deleteMealId}) => {

    const userAuth = useAuth()
    const {token, refresh, setToken, setRefresh} = userAuth

    const handleDelete = () => {
        setConfirmDelete(false)
        ApiCall(`meal/${deleteMealId}/`, 'delete', token,refresh, setToken, setRefresh)
        .then(function(response){
            if(response.status === 200){
                ToastMessage("success", "Item deleted successfully")
                setDeleteMealName('')
                setTimeout(() =>{
                    window.location.reload()
                }, 1000)
            }
        })
        .catch((error) => {
            console.log("an error occured", error)
        })

    }

    return(
        <div className={`${confirmDelete ? 'flex blur-none' : 'hidden'} z-10000 fixed inset-0 justify-center items-center`}>
            <div className='p-2 bg-white rounded shadow-md'>
                <p>Do you want to delete {deleteMealName} ?</p>
                <div className='flex justify-around mt-2'>
                    <button onClick={(e) => handleDelete(e)} >Yes</button>
                    <button onClick={() => setConfirmDelete(false)}>No</button>
                </div>
            </div>
        </div>
    )
}



