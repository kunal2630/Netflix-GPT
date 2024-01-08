import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import nowPlayingMovieReducer from "./nowPlayingMovieSlice";
import movieReducer from './movieSlice';
import searchReducer from "./searchSlice";

const appstore = configureStore({
  reducer: {
    user: userReducer,
    nowPlayingMovieData: nowPlayingMovieReducer, 
    movie:movieReducer,
    search:searchReducer
  },
});

export default appstore;
