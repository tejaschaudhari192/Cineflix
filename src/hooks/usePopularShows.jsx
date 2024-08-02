import React, {useEffect} from 'react';
import {API_OPTIONS} from "../utils/constants.js";
import {addNowPlayingMovies, addPopularMovies, addPopularShows} from "../utils/moviesSlice.js";
import {useDispatch, useSelector} from "react-redux";

const usePopularShows = () => {
    const dispatch = useDispatch();
    const popularShows = useSelector((store) => store.popularShows);
    const getPopularShows = async () => {
        const data = await fetch(
            'https://api.themoviedb.org/3/tv/popular?language=en-US&page=1&region=IN',
            API_OPTIONS);

        const json = await data.json();
        dispatch(addPopularShows(json.results));
    }

    useEffect(() => {
        !popularShows && getPopularShows();
    }, [])

};

export default usePopularShows;