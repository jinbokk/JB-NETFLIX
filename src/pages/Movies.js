import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { movieActions } from "../redux/actions/movieActions";
import { FadeLoader } from "react-spinners";
import MovieList from "../component/MovieList";
import FilteredMovieList from "./FilteredMovieList";
import MovieFilterSlider from "../component/MovieFilterSlider";
import MovieFilterButton from "../component/MovieFilterButton";
import MovieFilterInput from "../component/MovieFilterInput";
import { movieFilterActions } from "../redux/actions/movieFilterActions";

const toggleHandler = () => {
  document.getElementById("MoviesHandler").style.left = 0;
  document.getElementById("MoviesHandler").style.width = "calc(100% - 60px)";
  document.getElementById("MoviesHandler").style.height = "100vh";
  // document.getElementById("MoviesHandler_toggleButton").style.right = "0";
};

const Movies = () => {
  // const { genreListData } = useSelector((state) => state.movie);

  // console.log("genreListData는", genreListData);

  const dispatch = useDispatch();

  const isMounted = useRef(false);

  const [
    keyword,
    sortBy,
    withGenres,
    includeVideo,
    releaseDateGte,
    releaseDateLte,
    voteAverageGte,
    voteAverageLte,
  ] = useSelector((state) => [
    state.movieFilter.keyword,
    state.movieFilter.sortBy,
    state.movieFilter.withGenres,
    state.movieFilter.includeVideo,
    state.movieFilter.releaseDateGte,
    state.movieFilter.releaseDateLte,
    state.movieFilter.voteAverageGte,
    state.movieFilter.voteAverageLte,
  ]);

  useEffect(() => {
    if (isMounted.current) {
      dispatch(
        movieFilterActions.getFilteredMovies(
          keyword,
          sortBy,
          withGenres,
          includeVideo,
          releaseDateGte,
          releaseDateLte,
          voteAverageGte,
          voteAverageLte
        )
      );
    } else {
      isMounted.current = true;
    }
  }, []);

  const listInnerRef = useRef();
  const [isBottom, setIsBottom] = useState(false);
  const [pageNum, setPageNum] = useState(1);

  const getMoreMovies = async () => {
    // dispatch(movieActions.getMovies(pageNum));
    setIsBottom(false);
  };

  const onScroll = () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      console.log("scrollTop is", scrollTop);
      console.log("scrollHeight is", scrollHeight);
      console.log("clientHeight is", clientHeight);
      if (scrollHeight - clientHeight === Math.ceil(scrollTop)) {
        console.log("reached bottom");
        setIsBottom(true);
        setPageNum(pageNum + 1);
        getMoreMovies();
      }
    }
  };

  const loading = useSelector((state) => state.movieFilter.loading);

  const { FilteredMoviesData } = useSelector((state) => state.movieFilter);

  // const [show, setShow] = useState(true);

  useEffect(() => {
    dispatch(movieFilterActions.getFilteredMovies(1));
  }, []);

  return loading ? (
    <div className="loadingSpinner">
      <FadeLoader color="red" loading={loading} size={15} speedMultiplier={3} />
    </div>
  ) : (
    <div
      onScroll={onScroll}
      ref={listInnerRef}
      style={{ height: "100%", overflowY: "auto" }}
    >
      <div className="MoviesPage">
        <button
          className="MoviesHandler_toggleButton"
          id="MoviesHandler_toggleButton"
          onClick={() => {
            toggleHandler();
          }}
        >
          <p className="MoviesHandler_toggleButton_text">FILTER</p>
        </button>
        <div className="MoviesHandler" id="MoviesHandler">
          <div className="MoviesHandler_container">
            <MovieFilterInput />
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
            <MovieFilterButton text={"GENRES"} />
          </div>
        </div>

        <div className="MovieListWrapper">
          {loading ? (
            <div className="loadingSpinner">
              <FadeLoader
                color="red"
                loading={loading}
                size={15}
                speedMultiplier={3}
              />
            </div>
          ) : (
            <FilteredMovieList movies={FilteredMoviesData.results} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Movies;

// show 는 맨처음 무비리스트 보여주고 안보여주고 용도
// isBottom이 true면 (===스크롤이 최하단까지 갔으면) div태그로 붙여줘야 한다.
