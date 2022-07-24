import React, { useEffect } from "react";
import Banner from "../component/Banner";
import { useDispatch, useSelector } from "react-redux";
import { movieActions } from "../redux/actions/movieActions";

const Home = () => {
  const dispatch = useDispatch();

  const { popularMoviesData, topRatedMoviesData, upcomingMoviesData } =
    useSelector((state) => state.movie);

  useEffect(() => {
    dispatch(movieActions.getMovies());
  }, []);

  return (
    <div>
      {popularMoviesData.results && <Banner popularMovies={popularMoviesData.results[0]}/>}
    </div>
  );
};

export default Home;
