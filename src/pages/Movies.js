import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { movieActions } from "../redux/actions/movieActions";
import { FadeLoader } from "react-spinners";
import MovieList from "../component/MovieList";
import MovieSearchSlider from "../component/MovieSearchSlider";
import MovieSearchButton from "../component/MovieSearchButton";
import MovieSearchInput from "../component/MovieSearchInput";

const Movies = () => {
  const { NowPlayingMoviesData, genreListData, loading } = useSelector(
    (state) => state.movie
  );

  const { getSearchedMoviesData, searchKeyword } = useSelector(
    (state) => state.movieSearch
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(movieActions.getMovies(1));
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
            <MovieSearchInput />
            <MovieSearchSlider min={1990} max={2020} text={"YEAR FILTER"} />
            <MovieSearchSlider min={1} max={10} text={"IBM SCORE FILTER"} />
            <MovieSearchButton genres={genreListData.genres} text={"GENRES"} />
          </div>
        </div>
      </div>
      <div className="MovieListWrapper" id="MovieList_wrapper">
        <MovieList movies={NowPlayingMoviesData.results} />
        {/* if search한 데이터가 있다면, 그걸 보여준다? */}
        {/* if 스크롤이 끝까지 가면, getMovies(page2)한다음, MovieList 추가*/}
        {console.log(searchKeyword)}
        {/* {searchKeyword === {} ? (
          <MovieList movies={NowPlayingMoviesData.results} />
        ) : (
          <MovieList movies={getSearchedMoviesData.results} />
        )} */}
      </div>
    </div>
  );
};

export default Movies;
