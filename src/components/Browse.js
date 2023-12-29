import React from "react";
import Header from "./Header";
import HomepageMainComponent from "./HomepageMainComponent";
import useFetchTrendingMovie from "../hooks/useFetchTrendingMovie";
import useFetchTopRatedMovie from "../hooks/useFetchTopRatedMovie";
import useFetchUpcomingMovie from "../hooks/useFetchUpcomingMovie";
import useFetchTvShows from "../hooks/useFetchTvShows";
import HomepageSecondaryComponent from "./HomepageSecondaryComponent";
import { useSelector } from "react-redux";
import GptSearch from "./GptSearch";

const Browse = () => {
  useFetchTrendingMovie();
  useFetchTopRatedMovie();
  useFetchUpcomingMovie();
  useFetchTvShows();

  const searchValue = useSelector((store) => store?.search?.searchValue);

  return (
    <>
      <Header />
      {searchValue ? (
        <GptSearch />
      ) : (
        <>
          <HomepageMainComponent />
          <HomepageSecondaryComponent />
        </>
      )}
    </>
  );
};

export default Browse;
