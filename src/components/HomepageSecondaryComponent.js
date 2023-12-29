import React from "react";
import Moviesection from "./Moviesection";
import { useSelector } from "react-redux";

const HomepageSecondaryComponent = () => {
  const trendingMovies = useSelector((store) => store.movie.trending);
  const topRatedMovies = useSelector((store) => store.movie.topRated);
  const upcomingMovies = useSelector((store) => store.movie.upcoming);
  const onAirShows = useSelector((store) => store.tvShows.onAir);
  const trendingShows = useSelector((store) => store.tvShows.trending);
  const topRatedShows = useSelector((store) => store.tvShows.topRated);

  return (
    <div className="bg-[#141414] bg-gradient-to-b from-black via-[#141414] to-[#141414]  ">
      <div className="-mt-44 z-10 ">
        <Moviesection
          sliderId="upcomingMoviesSlider"
          title="Upcoming "
          data={upcomingMovies}
        />

        <Moviesection
          sliderId="trendingSlider"
          title="Trending Movies "
          data={trendingMovies}
        />

        <Moviesection
          sliderId="topRatedMoviesSlider"
          title="Top Rated Movies"
          data={topRatedMovies}
        />
        <Moviesection
          sliderId="topRatedShowsSlider"
          title="Top TV Shows"
          data={topRatedShows}
        />
        <Moviesection
          sliderId="onAirShowsSlider"
          title="On Air Shows"
          data={onAirShows}
        />
        <Moviesection
          sliderId="trendingShowsSlider"
          title="Trending Shows"
          data={trendingShows}
        />
      </div>
    </div>
  );
};

export default HomepageSecondaryComponent;
