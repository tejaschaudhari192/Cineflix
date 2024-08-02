import React from 'react';
import {IMG_CDN} from "../../utils/constants.js";
import useGetBanner from "../../hooks/useGetBanner.jsx";

const MovieCard = ({movie}) => {
    const title = movie.title;
    // console.log(movie.id)
    const poster = IMG_CDN + movie.poster_path;
    // const poster = IMG_CDN + useGetBanner(movie.id);
    if (!poster) return null

    return (
        <div className={"flex flex-col gap-2"}>
            <div
                className="min-w-[200px] h-[300px] rounded-xl bg-cover bg-center"
                style={{backgroundImage: `url(${poster})`}}>

            </div>
            <div>
                <h1 className={"text-center font-semibold"}>
                    {title}
                </h1>
            </div>
        </div>
    );
};

export default MovieCard;