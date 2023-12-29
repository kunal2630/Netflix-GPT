import { useEffect, useState } from "react";
import { options } from "../utils/constants";

const useFetchNowPlayingMovieTeaser = (id) => {
  const [trailerData, setTrailerData] = useState();

  const fetchTrailerInfo = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
      options
    );
    const data = await response.json();
    const filterData = await data?.results?.filter(
      (it) => it.type === "Trailer"
    );
    if (filterData?.length > 0) setTrailerData(filterData[0]);
  };

  useEffect(() => {
    fetchTrailerInfo();
  }, [id]);

  return trailerData;
};

export default useFetchNowPlayingMovieTeaser;
