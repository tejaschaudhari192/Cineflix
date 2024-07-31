import {createSlice} from "@reduxjs/toolkit";

const moviesSlice = createSlice({
    name: 'movies',
    initialState: {
        nowPlayingMovies: null,
        trailerVideo: null,
        popularMovies: null,
        popularShows:null
    },
    reducers: {
        addNowPlayingMovies: (state, action) => {
            state.nowPlayingMovies = action.payload;
        },
        addTrailerVideo: (state, action) => {
            state.trailerVideo = action.payload;
        },
        addPopularMovies: (state, action) => {
            state.popularMovies = action.payload;
        },
        addPopularShows: (state, action) => {
            state.popularShows = action.payload;
        }
    }
})
export const {
    addNowPlayingMovies,
    addTrailerVideo,
    addPopularMovies,
    addPopularShows
} = moviesSlice.actions;
export default moviesSlice.reducer;
