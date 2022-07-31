import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { movieActions } from "../redux/actions/movieActions";
import { ClipLoader } from "react-spinners";
import MovieList from "../component/MovieList";
import Slider from "react-slick";

const Movies = () => {
  const { NowPlayingMoviesData, loading } = useSelector((state) => state.movie);
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
      <ClipLoader color="red" loading={loading} size={300} />
    </div>
  ) : (
    <div className="MoviesPage">
      <div>
        <div className="MoviesHandler">
          MoviesHandler Section
          <Slider
            getAriaLabel={() => "Year range"}
            value={30}
            // onChange={handleChange}
            valueLabelDisplay="auto"
            // getAriaValueText={valuetext}
          />
        </div>
      </div>
      <div className="MovieList">
        <MovieList movies={NowPlayingMoviesData.results} />
      </div>
    </div>
  );
};

export default Movies;
