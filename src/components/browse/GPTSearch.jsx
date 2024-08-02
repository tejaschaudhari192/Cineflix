import React, {Suspense, useRef} from 'react';
import Loader from "react-js-loader";
import genAI, {model} from "../../utils/genAI.js";
import {API_OPTIONS, GPT_PROMPT} from "../../utils/constants.js";
import {useDispatch, useSelector} from "react-redux";
import {addGPTMovieResult} from "../../utils/gptSlice.js";
import {addLoadingState} from "../../utils/loadSlice.js";
import MovieList from "./MovieList.jsx";


const searchMovieTMDB = async (title) => {
    const data = await fetch(`https://api.themoviedb.org/3/search/movie?query=${title}&language=en-US&page=1`, API_OPTIONS)
    const json = await data.json();
    return json.results;
}

const GPTSearchBar = () => {
    const dispatch = useDispatch();
    const searchText = useRef(null)

    const handleGPTSearchClick = async () => {
        dispatch(addLoadingState("Generating movies"))

        const query = GPT_PROMPT + searchText.current.value;

        const result = await model.generateContent(query)
            .then((result) => {
                dispatch(addLoadingState("Getting names"))


                const resultSet = result.response.text().split(',')

                const promiseSet = resultSet.map(async (title) => searchMovieTMDB(title))
                const movieSet = Promise.all(promiseSet).then((movies) => {
                    dispatch(addLoadingState("fetching details"))

                    dispatch(addGPTMovieResult(movies))
                })


            }).catch((err) => {
                // console.log(err)
                console.log(err.message === "[GoogleGenerativeAI Error]: Candidate was blocked due to SAFETY")
                dispatch(addLoadingState(null))
            })
        // const response = await result.response;
        // console.log(response.text().split(','));

        // streaming text

        // const result = await model.generateContentStream(query);
        // let text = '';
        // for await (const chunk of result.stream) {
        //     const chunkText = chunk.text();
        //     console.log(chunkText);
        //     text += chunkText;
        //     setResultText(text);
        // }


        // const promiseSet = resultSet.map(title => searchMovieTMDB(title))
        // console.log(resultSet)


    }

    return (
        <div className="p-10 login ">
            <form
                className="bg-black grid grid-cols-4 md:grid-cols-12 sm:grid-cols-6 m-auto md:w-1/2 md:gap-10 mt-16"
                onSubmit={e => e.preventDefault()}>
                <input
                    type="text"
                    ref={searchText}
                    placeholder={"What would you like to watch today ?"}
                    className="p-4 bg-gray-800 col-span-3 md:col-span-8"
                />
                <button
                    className="p-2 m-2 bg-red-700 text-white rounded-lg col-span-1 md:col-span-4"
                    onClick={handleGPTSearchClick}>
                    Search
                </button>
            </form>
            <p
                className="text-center mt-10 text-2xl">
            </p>
        </div>
    );
};

const GPTSuggestion = () => {
    const dispatch = useDispatch();
    const loadingState = useSelector((store) => store.loader.loadingState);

    const gptMovies = useSelector((store) => store.gpt.gptMovieResult);
    if (!gptMovies) return null;


    let movies = []

    gptMovies.map(arr => {
        if (arr.length > 0) {
            movies.push(arr[0])
        }
    })

    // console.log(loadingState)
    if (loadingState === "fetching details")
        dispatch(addLoadingState(null))

    return (
        <div className={"-mt-[500px]"}>
            <MovieList movies={movies} title={"suggestions"}/>
        </div>
    );
};


const GPTSearch = () => {
    const loadingState = useSelector((store) => store.loader.loadingState);
    return (
        <div>
            <GPTSearchBar/>
            {
                loadingState && <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Loader type='heart' bgColor="red" color="white" title={loadingState} size={100}/>
                </div>
            }

            <Suspense fallback={"loadming..."}>
                <GPTSuggestion/>
            </Suspense>

        </div>
    );
};

export default GPTSearch;