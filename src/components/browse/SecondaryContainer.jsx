import React from 'react';
import MovieList from "./MovieList.jsx";
import {useSelector} from "react-redux";
import usePopularMovies from "../../hooks/usePopularMovies.jsx";
import usePopularShows from "../../hooks/usePopularShows.jsx";

const SecondaryContainer = () => {

    const movies = useSelector((store) => store.movies);
    usePopularMovies();
    usePopularShows();

    return (
        <div className={"bg-black"}>
            <div className={"flex flex-col md:-mt-52 relative z-20 bg-transparent"}>
                <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies}/>
                <MovieList title={"Popular Shows"} movies={movies.popularShows}/>
                <MovieList title={"Popular Movies"} movies={movies.popularMovies}/>
            </div>
        </div>
    );
};

export default SecondaryContainer;