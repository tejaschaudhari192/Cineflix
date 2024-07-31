import React, {useEffect} from 'react';
import {API_OPTIONS} from "../utils/constants.js";
import {addNowPlayingMovies, addPopularMovies, addPopularShows} from "../utils/moviesSlice.js";
import {useDispatch} from "react-redux";

const usePopularShows = () => {
    const dispatch = useDispatch();
    const getPopularShows = async () => {
        const data = await fetch(
            'https://api.themoviedb.org/3/tv/popular?language=en-US&page=1&region=IN',
            API_OPTIONS);

        const json = await data.json();
        dispatch(addPopularShows(json.results));
    }

    useEffect(() => {
        getPopularShows();
    }, [])

};

export default usePopularShows;