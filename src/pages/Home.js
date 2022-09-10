import React, { useEffect, useState, useRef } from "react";
import Banner from "../component/Banner";
import { useDispatch, useSelector } from "react-redux";
import { movieActions } from "../redux/actions/movieActions";
import MovieSlide from "../component/MovieSlide";
import { FadeLoader } from "react-spinners";
import MovieVideo from "../component/MovieVideo";
import api from "../redux/api";
import Footer from "../component/Footer";
import MovieVideoForBanner from "../component/MovieVideoForBanner";
import TextAnimation from "../component/TextAnimation";

const Home = () => {
  const dispatch = useDispatch();
  const isMounted = useRef(false);

  const { popularMoviesData, topRatedMoviesData, upcomingMoviesData, loading } =
    useSelector((state) => state.movie);
  const getMovieKeyForBanner = async () => {
    const API_KEY = process.env.REACT_APP_API_KEY;
    const movie_id =
      popularMoviesData.results && popularMoviesData.results[0].id;
    const selectedMovieJson = await api.get(
      `/movie/${movie_id}/videos?api_key=${API_KEY}&language=en-US`
    );

    const movieKeyForBanner = selectedMovieJson.data.results.find(
      (item) => item.name === "Official Trailer" || item.name === "Trailer"
    )
      ? selectedMovieJson.data.results.find(
          (item) => item.name === "Official Trailer" || item.name === "Trailer"
        ).key
      : selectedMovieJson.data.results[0].key || null;

    dispatch({
      type: "STORE_MOVIE_KEY_FOR_BANNER_SUCCESS",
      payload: {
        movieKeyForBanner: movieKeyForBanner,
      },
    });
  };

  useEffect(() => {
    dispatch(movieActions.getMovies());
    return () => {
      dispatch({ type: "RESET_MOVIE_STORE_SUCCESS" });
    };
  }, []);

  useEffect(() => {
    if (isMounted.current) {
      getMovieKeyForBanner();
    } else {
      isMounted.current = true;
    }
  }, [popularMoviesData.results]);

  const [bannerChange, setBannerChange] = useState(false);

  const isTimeout = setTimeout(() => {
    setBannerChange(true);
  }, 3000);

  return loading ? (
    <div className="loadingSpinner">
      <FadeLoader color="red" loading={loading} size={15} speedMultiplier={3} />
    </div>
  ) : (
    <div className="home">
      <div className="banner_container">
        <div style={{ position: "relative", top: "60px" }}>
          <TextAnimation movie={popularMoviesData.results[0]} />
        </div>

        {bannerChange ? (
          <div className="bannerVideo_container">
            <MovieVideoForBanner />
          </div>
        ) : (
          <div
            className="banner"
            style={{
              backgroundImage:
                "url(" +
                `https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${popularMoviesData.results[0].poster_path}` +
                ")",
            }}
          ></div>
        )}
      </div>

      <h1>
        <span className="subTitle_arrow">&#10095;</span>
        POPULAR MOVIES
      </h1>
      <MovieSlide movies={popularMoviesData.results} />
      <h1>
        <span className="subTitle_arrow">&#10095;</span>
        TOP RATED MOVIES
      </h1>
      <MovieSlide movies={topRatedMoviesData.results} />
      <h1>
        <span className="subTitle_arrow">&#10095;</span>
        UPCOMING MOVIES
      </h1>
      <MovieSlide movies={upcomingMoviesData.results} />
      <Footer />
    </div>
  );
};

export default Home;
