import React, {useEffect} from 'react'
import Header from "../Header.jsx";
import {API_OPTIONS} from "../../utils/constants.js";
import {useDispatch} from "react-redux";
import {addNowPlayingMovies} from "../../utils/moviesSlice.js";
import useNowPlayingMovies from "../../hooks/useNowPlayingMovies.jsx";
import MainContainer from "../MainContainer.jsx";


const Browse = () => {
    useNowPlayingMovies();

    return (
        <div className='h-screen w-full'>
            <div className="w-screen absolute z-10">
            <Header/>
            </div>
            <div className="pt-[30%] md:pt-0 bg-black">
                <MainContainer/>
            </div>
        </div>
    );
};

export default Browse
