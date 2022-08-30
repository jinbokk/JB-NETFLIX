import React, { useEffect, useState } from "react";
import Banner from "../component/Banner";
import { useDispatch, useSelector } from "react-redux";
import { movieActions } from "../redux/actions/movieActions";
import MovieSlide from "../component/MovieSlide";
import { FadeLoader } from "react-spinners";
import MovieVideo from "../component/MovieVideo";
import api from "../redux/api";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(movieActions.getMovies(1));
    return () => {
      dispatch({ type: "RESET_MOVIE_STORE_SUCCESS" });
    };
  }, []);

  const { popularMoviesData, topRatedMoviesData, upcomingMoviesData, loading } =
    useSelector((state) => state.movie);

  // const [changeBanner, setChangeBanner] = useState(false);
  // const timer = setTimeout(() => {
  //   setChangeBanner(true);
  // }, 2000);

  // useEffect(() => {
  //   const getMovieKey = async () => {
  //     const API_KEY = process.env.REACT_APP_API_KEY;
  //     console.log(popularMoviesData);
  //     const movie_id = popularMoviesData.results[0].id;
  //     console.log(movie_id);

  //     const selectedMovieJson = await api.get(
  //       `/movie/${movie_id}/videos?api_key=${API_KEY}&language=en-US`
  //     );

  //     console.log("json is", selectedMovieJson);

  //     const movieKey = selectedMovieJson.data.results.find(
  //       (item) => item.name === "Official Trailer" || item.name === "Trailer"
  //     )
  //       ? selectedMovieJson.data.results.find(
  //           (item) =>
  //             item.name === "Official Trailer" || item.name === "Trailer"
  //         ).key
  //       : selectedMovieJson.data.results[0].key;

  //     console.log("find key is", movieKey);

  //     dispatch({
  //       type: "STORE_MOVIE_KEY_SUCCESS",
  //       payload: {
  //         movieKey: movieKey,
  //       },
  //     });
  //   };

  //   getMovieKey();
  // }, [changeBanner]);

  return loading ? (
    <div className="loadingSpinner">
      <FadeLoader color="red" loading={loading} size={15} speedMultiplier={3} />
    </div>
  ) : (
    <div className="home">
      <div>
        <Banner movie={popularMoviesData.results[0]} />
      </div>

      {/* {changeBanner ? (
        <div className="previewVideo_container">
          <MovieVideo />
        </div>
      ) : (
        <div>
          <Banner movie={popularMoviesData.results[0]} />
        </div>
      )} */}

      <h1>
        <span className="subTitle">&#10095;</span>
        POPULAR MOVIES
      </h1>
      <MovieSlide movies={popularMoviesData.results} />
      <h1>
        <span className="subTitle">&#10095;</span>
        TOP RATED MOVIES
      </h1>
      <MovieSlide movies={topRatedMoviesData.results} />
      <h1>
        <span className="subTitle">&#10095;</span>
        UPCOMING MOVIES
      </h1>
      <MovieSlide movies={upcomingMoviesData.results} />
    </div>
  );
};

export default Home;
