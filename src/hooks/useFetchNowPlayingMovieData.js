import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { options } from "../utils/constants";
import { addNowPlayingMovie } from "../utils/nowPlayingMovieSlice";

const useFetchNowPlayingMovieData = () => {
  const dispatch = useDispatch();

  const fetchNowPlayingMovies = async () => {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/now_playing?page=1",
      options
    );
    const nowPlayingMovies = await response.json();
    dispatch(addNowPlayingMovie(nowPlayingMovies));
  };

  useEffect(() => {
    fetchNowPlayingMovies();
  }, []);


};

export default useFetchNowPlayingMovieData;
