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
  //   releaseDateGte,
  //   releaseDateLte,
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


// 1.movieFilterActions에 api get 요청,
// 2. 데이터를 다 받으면 loading=false 재할당, movieFilterReducer의 store에 저장
// XXXXX 3. 해당 데이터를 Movies 페이지에 전달 XXXXX
// 3. movies 페이지가 해당 데이터를 useSelector로 가져온다.


// 1번 과정 이전에, 먼제 api에 들어가는 parameter들을 가져와야 한다
// 해당 parameter들은 MovieFilterInput,MovieFilterSlider,MovieFilterButton 에서
// 각자 movieFilterReducer에 저장하고 있다. (!!! 여기가 뭔가 포인트 인듯. 같은 리듀서를 공유하고 있다?)

// 음.. movieFilterReducer가 아니라 다른 WrapperReducer를 하나 새로 만들고, 이곳의 store를
// useSelector로 가져오는 방식으로 해볼까?

// 결과  >>> 화면에 렌더링 해준다
