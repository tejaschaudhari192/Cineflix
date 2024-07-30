import React, {useEffect} from 'react'
import Header from "./Header.jsx";
import {API_OPTIONS} from "../utils/constants.js";


const Browse = () => {
    const getNowPlayingMovies = async () => {
        const data = await fetch(
            'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1&region=IN',
            API_OPTIONS);

        const json = await data.json();
        console.log(json)
    }
    useEffect(() => {
        getNowPlayingMovies();
    },[])

    return (
        <div className='h-screen w-full'>
            <Header/>

        </div>
    )
}

export default Browse
