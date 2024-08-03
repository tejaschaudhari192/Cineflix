import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {API_OPTIONS} from "../../utils/constants.js";
import MovieList from "./MovieList.jsx";

const MovieDetailsModal = ({movie, isOpen, onClose}) => {
    const [movies, setMovies] = useState([])

    useEffect(() => {
        recom();
    }, [movies]);

    if (!isOpen) return null;
    if (!movie) return <div>Loading...</div>;

    async function recom() {
        const data = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}/recommendations?language=en-US&page=1`, API_OPTIONS)
        const json = await data.json();
        setMovies(json.results);
    }

    // console.log(movie)
    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
            <div className=" p-6 max-w-4xl w-full mx-auto rounded-lg relative">
                <div className="flex flex-col md:flex-row">
                    <button onClick={onClose}
                            className="absolute top-4 right-4 -mt-16 text-white bg-red-600 rounded-full px-3 py-1">Close
                    </button>
                    <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        className="w-full md:w-1/3 rounded-lg"
                    />
                    <div className="md:ml-6 flex-1">
                        <h1 className="text-4xl font-bold">{movie.title}</h1>
                        {/*<p className="text-lg mt-2">{movie.release_date} | {movie.runtime} min | {movie.genres.map(genre => genre.name).join(', ')}</p>*/}
                        <p className="mt-4">{movie.overview}</p>
                        <div className="mt-6">
                            <h2 className="text-2xl font-bold">Starring</h2>
                            <p>Vijay Sethupathi, Anurag Kashyap, Mamtha Mohandas</p> {/* This is static for now */}
                        </div>
                        <MovieList title={"Recommendations"} movie={movies} />

                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetailsModal;
