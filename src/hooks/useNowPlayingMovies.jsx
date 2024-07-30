import React, {useEffect} from 'react';
import {API_OPTIONS} from "../utils/constants.js";
import {addNowPlayingMovies} from "../utils/moviesSlice.js";
import {useDispatch} from "react-redux";

const useNowPlayingMovies = () => {
    const dispatch = useDispatch();
    const getNowPlayingMovies = async () => {
        const data = await fetch(
            'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1&region=IN',
            API_OPTIONS);

        const json = await data.json();
        dispatch(addNowPlayingMovies(json.results));
    }

    useEffect(() => {
        getNowPlayingMovies();
    }, [])

};

export default useNowPlayingMovies;