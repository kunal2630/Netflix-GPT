import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { options } from "../utils/constants";
import { addTopRatedMovies } from "../utils/movieSlice";

const useFetchTopRatedMovie = () => {
  const topRatedMovie = useSelector((store) => store.movie.topRatedMovie);

  const dispatch = useDispatch();

  const fetchTopRatedMovie = async () => {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
      options
    );
    const topRatedMovie = await response.json();
    dispatch(addTopRatedMovies(topRatedMovie));
  };

  useEffect(() => {
    if (!topRatedMovie) {
      fetchTopRatedMovie();
    }
  }, []);
};

export default useFetchTopRatedMovie;
