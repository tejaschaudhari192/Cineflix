import React, {useEffect} from 'react'
import Header from "./Header.jsx";
import {API_OPTIONS} from "../utils/constants.js";
import {useDispatch} from "react-redux";
import {addNowPlayingMovies} from "../utils/moviesSlice.js";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies.jsx";


const Browse = () => {
    useNowPlayingMovies();

    return (
        <div className='h-screen w-full'>
            <Header/>
        </div>
    )
}

export default Browse
