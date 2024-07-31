import React from 'react';
import {IMG_CDN} from "../../utils/constants.js";

const MovieCard = ({movie}) => {
    const title = movie.original_title;
    const poster = IMG_CDN + movie.poster_path;

    return (
        <div
            className="min-w-[200px] h-[300px] rounded-xl bg-cover bg-center"
            style={{backgroundImage: `url(${poster})`}}>
        </div>
    );
};

export default MovieCard;