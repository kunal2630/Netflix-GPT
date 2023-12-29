import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { options } from "../utils/constants";
import { addTrendingMovies } from "../utils/movieSlice";

const useFetchTrendingMovie = () => {
  const dispatch = useDispatch();

  const fetchTrendingMovie = async () => {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
      options
    );
    const trendingMovies = await response.json();
    dispatch(addTrendingMovies(trendingMovies));
  };

  useEffect(() => {
    fetchTrendingMovie();
  }, []);
};

export default useFetchTrendingMovie;
