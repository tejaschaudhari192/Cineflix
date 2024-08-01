import React, {useEffect, useRef, useState} from 'react';
import genAI from "../../utils/genAI.js";
import {API_OPTIONS, GPT_PROMPT} from "../../utils/constants.js";
import {useDispatch, useSelector} from "react-redux";
import {addGPTMovieResult} from "../../utils/gptSlice.js";
import MovieCard from "./MovieCard.jsx";
import MovieList from "./MovieList.jsx";

const searchMovieTMDB = async (title) => {
    const data = await fetch(`https://api.themoviedb.org/3/search/movie?query=${title}&language=en-US&page=1`, API_OPTIONS)
    const json = await data.json();
    return json.results;
}

const GPTSearchBar = () => {
    const dispatch = useDispatch();
    const searchText = useRef(null)
    const [resultSet, setResultSet] = useState([])

    const handleGPTSearchClick = async () => {

        const model = genAI.getGenerativeModel({model: "gemini-1.5-flash"});

        const query = GPT_PROMPT + searchText.current.value;

        const result = await model.generateContent(query)
        const response = await result.response;
        // console.log(response.text().split(','));
        setResultSet(response.text().split(','))

        // streaming text

        // const result = await model.generateContentStream(query);
        // let text = '';
        // for await (const chunk of result.stream) {
        //     const chunkText = chunk.text();
        //     console.log(chunkText);
        //     text += chunkText;
        //     setResultText(text);
        // }


        const promiseSet = resultSet.map(title => searchMovieTMDB(title))
        // console.log(resultSet)

        const movieSet = await Promise.all(promiseSet);
        console.log(movieSet)

        dispatch(addGPTMovieResult(movieSet))


    }

    return (
        <div className="p-10 login -mt-16">
            <form
                className="bg-black grid grid-cols-12 m-auto w-1/2 gap-10 mt-16"
                onSubmit={e => e.preventDefault()}>
                <input
                    type="text"
                    ref={searchText}
                    placeholder={"What would you like to watch today ?"}
                    className="p-4 bg-gray-800 w-full col-span-8"
                />
                <button
                    className="p-2 m-2 bg-red-700 text-white rounded-lg col-span-4"
                    onClick={handleGPTSearchClick}>
                    Search
                </button>
            </form>

            <p
                className="text-center mt-10 text-2xl">
                Movies : {resultSet}</p>
        </div>
    );
};

const GPTSuggestion = () => {
    // const [movies, setMovies] = useState([])
    const gptMovies = useSelector((store) => store.gpt.gptMovieResult);
    if (!gptMovies) return null;
    console.log(gptMovies)
    const movies = gptMovies.map((movies) => {
            return movies[0]
        }
    )

    // useEffect(() => {
    // setMovies(result)
    // },[])
    return (
        <div className={"-mt-96"}>
            <MovieList movies={movies} title={"suggestions"}/>
        </div>
    );
};


const GPTSearch = () => {
    return (
        <div>
            <GPTSearchBar/>
            <GPTSuggestion/>

        </div>
    );
};

export default GPTSearch;