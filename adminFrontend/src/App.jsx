import React, { useContext, useEffect } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';

import Layout from './components/Layout'
import Dashboard from './components/Dashboard'
import AddAdmin from './components/AddAdmin'
import AddDoctor from './components/AddDoctor'
import Doctors from './components/Doctors'
import Messages from './components/Messages'
import Login from './components/Login'

import { ToastContainer } from 'react-toastify'
import { AccountContext } from './context/AccountContext';

const router = createBrowserRouter([
  {path:'/', element: <Layout/>, children:[
    {path:'/', element: <Dashboard/>},
    {path:'/login', element: <Login/>},
    {path:'/doctor/add', element: <AddDoctor/>},
    {path:'/admin/add', element: <AddAdmin/>},
    {path:'/doctors', element: <Doctors/>},
    {path:'/messages', element: <Messages/>},
  ]}
])

const App = () => {
  const { isAuthenticated, setIsAuthenticated, setAdmin } =
    useContext(AccountContext);

    useEffect(() => {
      const fetchUser = async () => {
        try {
          const response = await axios.get(
            "http://localhost:3200/api/v1/user/admin",
            { withCredentials: true }
          );
  
          setIsAuthenticated(true);
          setAdmin(response.data.user);
        } catch (err) {
          setIsAuthenticated(false);
          setAdmin({});
        }
      };
  
      fetchUser();
    },[isAuthenticated]);


  return (
   <div>
   <RouterProvider router={router}/>
   <ToastContainer autoClose={2000}/>
   </div>
  )
}

export default App
