import React, { useEffect, useState, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { movieActions } from "../redux/actions/movieActions";
import { FadeLoader } from "react-spinners";
import MovieList from "../component/MovieList";
import FilteredMovieList from "./FilteredMovieList";
import MovieFilterSlider from "../component/MovieFilterSlider";
import MovieFilterButton from "../component/MovieFilterButton";
import MovieFilterInput from "../component/MovieFilterInput";
import { movieFilterActions } from "../redux/actions/movieFilterActions";
import api from "../redux/api";

const toggleHandler = () => {
  document.getElementById("MoviesHandler").style.left = 0;
  document.getElementById("MoviesHandler").style.width = "calc(100% - 60px)";
  document.getElementById("MoviesHandler").style.height = "100vh";
  // document.getElementById("MoviesHandler_toggleButton").style.right = "0";
};

const Movies = () => {
  const dispatch = useDispatch();

  const {
    loading,
    moreMoviesData,
    moreMoviesDataLoading,
    filteredMoviesData,
    keyword,
    sortBy,
    withGenres,
    includeVideo,
    releaseDateGte,
    releaseDateLte,
    voteAverageGte,
    voteAverageLte,
  } = useSelector((state) => state.movieFilter);

  const observer = useRef();
  const lastMovieElementRef = useCallback(
    (node) => {
      if (moreMoviesDataLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          console.log("Visible TEST 중입니다");
        }
      });
      if (node) observer.current.observe(node);
      console.log("node 테스트중입니다", node);
    },
    [moreMoviesDataLoading]
  );

  useEffect(() => {
    setPageNum(1);
  }, [
    keyword,
    sortBy,
    withGenres,
    includeVideo,
    releaseDateGte,
    releaseDateLte,
    voteAverageGte,
    voteAverageLte,
  ]);

  const listInnerRef = useRef();
  const [mergeData, setMergeData] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const getMoreMovies = async (pageNum) => {
    dispatch({ type: "GET_MORE_MOVIES_REQUEST" });

    console.log("pageNum 테스트중입니다", pageNum);

    const API_KEY = process.env.REACT_APP_API_KEY;

    const loadMoreMovies = await api.get(
      `/discover/movie?api_key=${API_KEY}&language=en-US&page=1&region=US${
        keyword ? `&with_text_query=${keyword}` : ""
      }${includeVideo ? `&include_video=${includeVideo}` : ""}${
        releaseDateGte ? `&release_date.gte=${releaseDateGte}` : ""
      }${releaseDateLte ? `&release_date.lte=${releaseDateLte}` : ""}${
        voteAverageGte ? `&vote_average.gte=${voteAverageGte}` : ""
      }${voteAverageLte ? `&vote_average.lte=${voteAverageLte}` : ""}${
        withGenres ? `&with_genres=${withGenres}` : ""
      }${sortBy ? `&sort_by=${sortBy}` : "&sort_by=popularity.desc"}${
        pageNum ? `&page=${pageNum}` : ""
      }`
    );

    dispatch({
      type: "GET_MORE_MOVIES_SUCCESS",
      payload: loadMoreMovies.data,
    });

    const newData = [];
    newData.push(loadMoreMovies.data);
    setMergeData((prevData) => [...prevData, ...newData]);
    console.log("mergeData는", mergeData);
  };

  const onScroll = () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      // console.log("scrollTop is", scrollTop);
      // console.log("scrollHeight is", scrollHeight);
      // console.log("clientHeight is", clientHeight);
      if (Math.ceil(scrollTop) + clientHeight >= scrollHeight) {
        console.log("reached bottom");
        setPageNum((prevPageNum) => prevPageNum + 1);
        getMoreMovies(pageNum);
      }
    }
  };

  // const [show, setShow] = useState(true);

  useEffect(() => {
    dispatch(
      movieFilterActions.getFilteredMovies(
        keyword,
        sortBy,
        withGenres,
        includeVideo,
        releaseDateGte,
        releaseDateLte,
        voteAverageGte,
        voteAverageLte,
        pageNum
      )
    );
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
          <FilteredMovieList
            movies={filteredMoviesData.results}
            innerRef={lastMovieElementRef}
          />

          {/* {moreMoviesDataLoading ? (
            <div className="loadingSpinner">
              <FadeLoader
                color="red"
                loading={loading}
                size={15}
                speedMultiplier={3}
              />
            </div>
          ) : (
            <FilteredMovieList
            movies={filteredMoviesData.results}
            innerRef={lastMovieElementRef}
          />
          )} */}
        </div>
      </div>
    </div>
  );
};

export default Movies;

// show 는 맨처음 무비리스트 보여주고 안보여주고 용도
// isBottom이 true면 (===스크롤이 최하단까지 갔으면) div태그로 붙여줘야 한다.
