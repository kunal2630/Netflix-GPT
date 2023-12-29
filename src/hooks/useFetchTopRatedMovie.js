import React ,{useEffect} from 'react';
import { useDispatch } from "react-redux";
import { options } from "../utils/constants";
import { addTopRatedMovies } from "../utils/movieSlice";

const useFetchTopRatedMovie = () => {

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
        fetchTopRatedMovie();
    }, []);

}

export default useFetchTopRatedMovie