import './App.css';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import authService from './appwrite/auth'
import {login, logout} from './store/authSlice';
import { Header, Footer } from './components';
import { Outlet } from 'react-router-dom';


function App() {
  
  const [loading, setLoading] = useState(true);
  const authStatus = useSelector(state => state.auth.status);
const dispatch = useDispatch();
  useEffect(()=>{
      authService.getCurrentUser()
      .then((userData)=>{
        if(userData)
        {
          dispatch(login(userData))
          console.log("Login Dispatch")
        }else{
          dispatch(logout())
          console.log("Logout Dispatch")
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      })
  }, [dispatch])
  if(loading)
  {
    return <div>Loading...</div>
  }else
  {
    return ( 
      <>
        <div className='min-h-screen mx-auto flex content-between bg-gray-400'>

          <div className='w-full block flex flex-col items-center'>
            <Header/>
            <main className='shadow-sm shadow-red-500 hover:shadow transition-all'>
               <Outlet/>  
            </main>
            <Footer/>
          </div>
        </div>
     
      </>
    )
  }
}

export default App;
