import React, { useEffect } from "react";
import Banner from "../component/Banner";
import { useDispatch, useSelector } from "react-redux";
import { movieActions } from "../redux/actions/movieActions";
import MovieSlide from "../component/MovieSlide";
import { FadeLoader } from "react-spinners";

const Home = () => {
  const dispatch = useDispatch();

  const { popularMoviesData, topRatedMoviesData, upcomingMoviesData, loading } =
    useSelector((state) => state.movie);

  useEffect(() => {
    dispatch(movieActions.getMovies());
  }, []);

  return loading ? (
    <div className="loadingSpinner">
      <FadeLoader
        color="red"
        loading={loading}
        size={15}
        speedMultiplier={3}
      />
    </div>
  ) : (
    <div className="home">
      <Banner movie={popularMoviesData.results[0]} />
      <h1>
        <span style={{ color: "red", fontSize: "22px", marginRight: "10px" }}>
          &#10095;
        </span>
        POPULAR MOVIES
      </h1>
      <MovieSlide movies={popularMoviesData.results} />
      <h1>
        <span style={{ color: "red", fontSize: "22px", marginRight: "10px" }}>
          &#10095;
        </span>
        TOP RATED MOVIES
      </h1>
      <MovieSlide movies={topRatedMoviesData.results} />
      <h1>
        <span style={{ color: "red", fontSize: "22px", marginRight: "10px" }}>
          &#10095;
        </span>
        UPCOMING MOVIES
      </h1>
      <MovieSlide movies={upcomingMoviesData.results} />
    </div>
  );
};

export default Home;
