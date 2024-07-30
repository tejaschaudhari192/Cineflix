import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer.jsx";
import VideoBg from "./browse/VideoBg.jsx";
import VideoTitle from "./browse/VideoTitle.jsx";

const MainContainer = () => {
    const movies = useSelector((store) => store.movies?.nowPlayingMovies);

    if (!movies) return;
    const mainMovie = movies[0];
    const {original_title, overview, id} = mainMovie;

    return (
        <div className='w-screen h-screen'>
            <VideoTitle
                title={original_title}
                overview={overview}/>
            <VideoBg
                id={id}/>

        </div>
    );
};

export default MainContainer;