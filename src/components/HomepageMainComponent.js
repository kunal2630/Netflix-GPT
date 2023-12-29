import React, { useEffect, useState } from "react";
import useFetchNowPlayingMovieTeaser from "../hooks/useFetchNowPlayingMovieTeaser";
import useFetchNowPlayingMovieData from "../hooks/useFetchNowPlayingMovieData";
import { FaPlay } from "react-icons/fa";
import { MdOutlineInfo } from "react-icons/md";
import { useSelector } from "react-redux";
const HomepageMainComponent = () => {
  useFetchNowPlayingMovieData();

  const nowPlayingMovieData = useSelector((store) => store.nowPlayingMovieData);

  const [movieInfo, setMovieInfo] = useState({
    id: null,
    title: "",
    description: "",
  });

  useEffect(() => {
    const results = nowPlayingMovieData?.nowPlayingMovie?.results;
    if (results && results.length > 0) {
      const { id, title, overview: description } = results[0];
      setMovieInfo({ id, title, description });
    }
  }, [nowPlayingMovieData]);

  const movieTeaserData = useFetchNowPlayingMovieTeaser(movieInfo.id);
  const movieTeaserId = movieTeaserData?.key;

  return (
    <div className=" ">
      <div className="absolute w-1/2 top-[30%]  sm:top-[25%] md:top-[30%]   left-12 z-20 text-white brightness-200	 ">
        <p className="text-2xl  md:text-4xl font-extrabold  tracking-widest mb-4 ">
          {movieInfo.title}
        </p>
        <p className=" hidden sm:flex text-lg  font-mono  font-medium tracking-tighter   text-white">
          {movieInfo.description}
        </p>
        <div className=" mt-6 flex gap-2">
          <button className="flex bg-white  text-black text-xl font-bold justify-center items-center px-4 py-2 rounded-md gap-2">
            <div className="flex">
              <FaPlay />
            </div>
            <div>Play</div>
          </button>
          <button className="flex text-white  bg-[#33333399] text-xl font-bold justify-center items-center px-4 py-2 rounded-md gap-2">
            <div className="flex text-xl ">
              <MdOutlineInfo />
            </div>
            <div>More Info</div>
          </button>
        </div>
      </div>
      <div className=" relative  -mt-[100px] ">
        <div className="">
          <iframe
            className="w-[100%] aspect-video  "
            src={`https://www.youtube.com/embed/${movieTeaserId}?playlist=${movieTeaserId}&loop=1&autoplay=1&mute=1&rel=0&controls=0`}
            title="YouTube video player"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default HomepageMainComponent;
