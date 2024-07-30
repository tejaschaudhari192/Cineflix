import {useSelector} from "react-redux";
import useMovieTrailer from "../../hooks/useMovieTrailer.jsx";
import React from "react";

const VideoBg = ({id}) => {
    const trailerVideo = useSelector((store) => store.movies?.trailerVideo);
    useMovieTrailer(id);

    return (
        <div className='w-screen aspect-video'>
            <iframe
                className="w-screen aspect-video"
                src={`https://www.youtube.com/embed/${trailerVideo?.key}?si=8V6WE-0nSBRyqGGW&controls=0&autoplay=0&mute=1`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
            ></iframe>
        </div>
    );
};

export default VideoBg;