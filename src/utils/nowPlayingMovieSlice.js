import { createSlice } from "@reduxjs/toolkit";

const initialState = { nowPlayingMovie: null };

const nowPlayingMovieSlice = createSlice({
  name: "nowPlayingMovieData",
  initialState,
  reducers: {
    addNowPlayingMovie(state, action) {
      state.nowPlayingMovie = action.payload;
    },
    removeNowPlayingMovie(state) {
      state.nowPlayingMovie = null;
    },
  },
});

export const { addNowPlayingMovie, removeNowPlayingMovie } =
  nowPlayingMovieSlice.actions;
export default nowPlayingMovieSlice.reducer;
