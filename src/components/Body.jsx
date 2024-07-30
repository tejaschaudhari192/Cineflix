import React, {useEffect} from 'react'
import Login from './Login'
import Browse from './browse/Browse.jsx'
import {createBrowserRouter, RouterProvider, useNavigate} from 'react-router-dom'
import {onAuthStateChanged} from 'firebase/auth'
import {auth} from '../utils/firebase'
import {useDispatch} from 'react-redux'
import {addUser, removeUser} from "../utils/userSlice.js";

const Body = () => {
    const appRouter = createBrowserRouter([
        {
            path: '/',
            element: <Login/>
        },
        {
            path: '/browse',
            element: <Browse/>
        }
    ]);

    return (
        <div className="bg-black">
            <RouterProvider router={appRouter}>
                <Login/>
                <Browse/>
            </RouterProvider>
        </div>
    )
}

export default Body
