import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movie",
  initialState: {
    trending:null,
    topRated:null,
    upcoming:null,
  },
  reducers: {
    addTrendingMovies: (state, action) => {
      state.trending= action.payload;
    },
    addTopRatedMovies: (state, action) => {
        state.topRated= action.payload;
    },
    addUpcomingMovies: (state, action) => {
        state.upcoming= action.payload;
    },

  },
});

export default movieSlice.reducer;
export const { addTrendingMovies,addTopRatedMovies,addUpcomingMovies } = movieSlice.actions;
