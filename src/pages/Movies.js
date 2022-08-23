import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { movieActions } from "../redux/actions/movieActions";
import { FadeLoader } from "react-spinners";
import MovieList from "./MovieList";
import MovieFilterSlider from "../component/MovieFilterSlider";
import MovieFilterButton from "../component/MovieFilterButton";
import MovieFilterInput from "../component/MovieFilterInput";
import FilteredMovieList from "./FilteredMovieList";

const Movies = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "RESET_FILTERED_MOVIES_SUCCESS" });
    dispatch(movieActions.getMovies(1));
  }, []);

  const { NowPlayingMoviesData, genreListData, loading } = useSelector(
    (state) => state.movie
  );

  const { FilteredMoviesData } = useSelector((state) => state.movieFilter);

  // const {
  //   keyword,
  //   withGenres,
  //   includeVideo,
  //   primaryReleaseDateGte,
  //   primaryReleaseDateLte,
  //   voteAverageGte,
  //   voteAverageLte,
  // } = useSelector((state) => state.movieFilter);

  const [show, setShow] = useState(true);

  return loading ? (
    <div className="loadingSpinner">
      <FadeLoader color="red" loading={loading} size={15} speedMultiplier={3} />
    </div>
  ) : (
    <div className="MoviesPage">
      <div className="MoviesHandler">
        <div className="MoviesHandler_container">
          <MovieFilterInput show={setShow} />
          <MovieFilterSlider
            min={1990}
            max={2020}
            text={"YEAR FILTER"}
            id={"year"}
          />
          <MovieFilterSlider
            min={1}
            max={10}
            text={"IBM SCORE FILTER"}
            id={"score"}
          />
          <MovieFilterButton genres={genreListData.genres} text={"GENRES"} />
        </div>
      </div>

      <div className="MovieListWrapper" id="MovieList_wrapper">
        {show ? (
          <MovieList movies={NowPlayingMoviesData.results} />
        ) : (
          FilteredMoviesData.results && (
            <FilteredMovieList movies={FilteredMoviesData.results} />
          )
        )}

        {/* if search한 데이터가 있다면, 그걸 보여준다? */}
        {/* if 스크롤이 끝까지 가면, getMovies(page2)한다음, MovieList 추가*/}

        {/* {keyword === {} ? (
          <MovieList movies={NowPlayingMoviesData.results} />
        ) : (
          <MovieList movies={FilteredMoviesData.results} />
        )} */}
      </div>
    </div>
  );
};

export default Movies;
