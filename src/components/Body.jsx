import React, {lazy, Suspense, useEffect} from 'react'
import Login from './Login'
import {createBrowserRouter, RouterProvider, useNavigate} from 'react-router-dom'


const Browse = lazy(() => import('./browse/Browse'))

const Body = () => {

    const appRouter = createBrowserRouter([
        {
            path: '/',
            element: <Login/>
        },
        {
            path: '/browse',
            element: <Suspense fallback={<h1>Loading...</h1>}>
                <Browse/>
            </Suspense>
        },
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
