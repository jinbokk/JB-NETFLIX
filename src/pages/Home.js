import React, { useEffect } from "react";
import Banner from "../component/Banner";
import { useDispatch, useSelector } from "react-redux";
import { movieActions } from "../redux/actions/movieActions";
import MovieSlide from "../component/MovieSlide";

const Home = () => {
  const dispatch = useDispatch();

  const { popularMoviesData, topRatedMoviesData, upcomingMoviesData } =
    useSelector((state) => state.movie);

  useEffect(() => {
    dispatch(movieActions.getMovies());
  }, []);

  return (
    <div>
      {popularMoviesData.results && (
        <Banner movie={popularMoviesData.results[0]} />
      )}
      <h1>POPULAR MOVIES</h1>
      <MovieSlide movies={popularMoviesData.results} />
      <h1>TOP RATED MOVIES</h1>
      <MovieSlide movies={topRatedMoviesData.results} />
      <h1>UPCOMING MOVIES</h1>
      <MovieSlide movies={upcomingMoviesData.results} />
    </div>
  );
};

export default Home;
