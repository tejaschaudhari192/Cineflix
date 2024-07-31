import React, {useEffect} from 'react';
import {API_OPTIONS} from "../utils/constants.js";
import {addNowPlayingMovies, addPopularMovies} from "../utils/moviesSlice.js";
import {useDispatch} from "react-redux";

const usePopularMovies = () => {
    const dispatch = useDispatch();
    const getPopularMovies = async () => {
        const data = await fetch(
            'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&region=IN',
            API_OPTIONS);

        const json = await data.json();
        dispatch(addPopularMovies(json.results));
    }

    useEffect(() => {
        getPopularMovies();
    }, [])

};

export default usePopularMovies;