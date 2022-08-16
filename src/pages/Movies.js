import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { movieActions } from "../redux/actions/movieActions";
import { FadeLoader } from "react-spinners";
import MovieList from "../component/MovieList";
import MovieSearchSlider from "../component/MovieSearchSlider";
import MovieSearchButton from "../component/MovieSearchButton";
// import Slider from "react-slick";

const Movies = () => {
  const { NowPlayingMoviesData, genreListData, loading } = useSelector(
    (state) => state.movie
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(movieActions.getMovies(3));
  }, []);

  return loading ? (
    <div className="loadingSpinner">
      <FadeLoader color="red" loading={loading} size={15} speedMultiplier={3} />
    </div>
  ) : (
    <div className="MoviesPage">
      <div>
        <div className="MoviesHandler">
          <div className="MoviesHandler_container">
            <MovieSearchSlider min={1990} max={2020} text={"YEAR FILTER"} />
            <MovieSearchSlider min={1} max={10} text={"IBM SCORE FILTER"} />
            <MovieSearchButton genres={genreListData.genres} text={"GENRES"} />
          </div>
        </div>
      </div>
      <div className="MovieList">
        <MovieList movies={NowPlayingMoviesData.results} />
      </div>
    </div>
  );
};

export default Movies;
