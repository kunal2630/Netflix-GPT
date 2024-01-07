import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  addCastDetailsFromId,
  addMovieDetailsFromId,
} from "../utils/movieSlice";
import { options } from "../utils/constants";

const useFetchMovieDetails = (id) => {
  const dispatch = useDispatch();

  const fetchMovieDetails = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/" + id + "?language=en-US",
      options
    );
    const movieDetails = await data.json();
    dispatch(addMovieDetailsFromId(movieDetails));
  };

  const fetchCastDetails = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/" + id + "/credits?language=en-US",
      options
    );
    const castDetails = await data.json();
    dispatch(addCastDetailsFromId(castDetails));
  };

  useEffect(() => {
    fetchMovieDetails();
    fetchCastDetails();
  }, [id]);
};

export default useFetchMovieDetails;
