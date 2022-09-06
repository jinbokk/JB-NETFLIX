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

  // const genreList = async () => {
  //   const API_KEY = process.env.REACT_APP_API_KEY;

  //   const getGenres = await api.get(
  //     `/genre/movie/list?api_key=${API_KEY}&language=en-US&region=US`
  //   );

  //   // const genresJson = await getGenres.json();

  //   return getGenres;
  // };

  const getMoreMovies = async (
    keyword,
    sortBy,
    withGenres,
    includeVideo,
    releaseDateGte,
    releaseDateLte,
    voteAverageGte,
    voteAverageLte,
    pageNum
  ) => {
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
        pageNum ? `&page=${pageNum}` : "&page=1"
      }`
    );

    // setHasMore(true);

    dispatch({
      type: "GET_MORE_MOVIES_SUCCESS",
      payload: loadMoreMovies.data,
    });

    console.log("loadMoreMovies.data is", loadMoreMovies.data);

    setMergeData((prevData) => [
      ...new Set([...prevData, ...loadMoreMovies.data.results]),
    ]);
    console.log("mergeData는", mergeData);
  };

  const observer = useRef();
  const lastMovieElementRef = useCallback(
    (node) => {
      if (moreMoviesDataLoading) return; // 무한 api요청 방지
      if (observer.current) observer.current.disconnect(); // 이전의 마지막 영화요소에 대해 disconnect 하고, 아래 함수를 통해 새로운 마지막 영화요소를 찾기위함이다
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          //&& hasMore 또한 추가하여 영화가 더 없는데 계속 요청하지 않도록 방지해야함
          console.log("Visible TEST 중입니다");
          setPageNum((prevPageNum) => prevPageNum + 1);
        }
      });
      if (node) observer.current.observe(node);
      console.log("node 테스트중입니다", node);
    },
    [moreMoviesDataLoading]
  );

  useEffect(() => {
    getMoreMovies(
      keyword,
      sortBy,
      withGenres,
      includeVideo,
      releaseDateGte,
      releaseDateLte,
      voteAverageGte,
      voteAverageLte,
      pageNum
    );
    setPageNum(1);
    setMergeData([]);
  }, []);

  // const listInnerRef = useRef();
  const [mergeData, setMergeData] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // const onScroll = () => {
  //   if (listInnerRef.current) {
  //     const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
  //     // console.log("scrollTop is", scrollTop);
  //     // console.log("scrollHeight is", scrollHeight);
  //     // console.log("clientHeight is", clientHeight);
  //     if (scrollTop + clientHeight >= scrollHeight - 5) {
  //       console.log("reached bottom");
  //       // setPageNum((prevPageNum) => prevPageNum + 1);
  //       getMoreMovies(
  //         keyword,
  //         sortBy,
  //         withGenres,
  //         includeVideo,
  //         releaseDateGte,
  //         releaseDateLte,
  //         voteAverageGte,
  //         voteAverageLte,
  //         pageNum
  //       );
  //     }
  //   }
  // };

  // const [show, setShow] = useState(true);

  // useEffect(() => {
  //   dispatch(
  //     movieFilterActions.getFilteredMovies(
  //       keyword,
  //       sortBy,
  //       withGenres,
  //       includeVideo,
  //       releaseDateGte,
  //       releaseDateLte,
  //       voteAverageGte,
  //       voteAverageLte,
  //       pageNum
  //     )
  //   );
  // }, []);

  return loading ? (
    <div className="loadingSpinner">
      <FadeLoader color="red" loading={loading} size={15} speedMultiplier={3} />
    </div>
  ) : (
    <div
    // onScroll={onScroll}
    // ref={listInnerRef}
    // style={{ height: "100%", overflowY: "auto" }}
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
            {/* <MovieFilterButton text={"GENRES"} genreList={genreList()} /> */}
          </div>
        </div>

        <div className="MovieListWrapper">
          {/* <FilteredMovieList
            movies={filteredMoviesData.results}
            innerRef={lastMovieElementRef}
          /> */}

          {moreMoviesDataLoading ? (
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
              movies={moreMoviesData.results}
              innerRef={lastMovieElementRef}
            />
          )}

          {/* {mergeData.map((item) => {
            return <div>{item}</div>;
          })} */}

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
