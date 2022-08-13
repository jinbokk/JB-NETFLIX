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
    dispatch(movieActions.getMovies());
  }, []);

  // 1.마운트 되자마자, useEffect hook을 사용하여 nowPlaying movies data를 가져온다.
  // 2.nowPlaying movies data를 리스트화 하여 렌더링 한다.
  // 3.user는 리스트의 데이터를 키워드 검색할 수 있다.
  // 4.user는 리스트의 데이터를 슬라이더를 이용한 검색을 할 수 있다.
  // 5.user는 리스트의 데이터를 필터링하여 볼 수 있다.

  return loading ? (
    <div className="loadingSpinner">
      <FadeLoader color="red" loading={loading} size={15} speedMultiplier={3} />
    </div>
  ) : (
    <div className="MoviesPage">
      <div>
        <div className="MoviesHandler">
          <div className="MoviesHandler_container">
            <h2>YEAR FILTER</h2>
            <MovieSearchSlider min={1990} max={2020} />
            <h2>IBM SCORE FILTER</h2>
            <MovieSearchSlider min={1} max={10} />
            <h2>GENRES</h2>
            <MovieSearchButton genres={genreListData.genres}/>
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
