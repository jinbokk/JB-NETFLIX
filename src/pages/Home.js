import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { movieActions } from "../redux/actions/movieActions";
import MovieSlide from "../component/MovieSlide";
import { FadeLoader } from "react-spinners";
import { movieDetailActions } from "../redux/actions/movieDetailActions";
import api from "../redux/api";
import Footer from "../component/Footer";
import MovieVideoForBanner from "../component/MovieVideoForBanner";
import TextAnimation from "../component/TextAnimation";
import styled from "styled-components";

const BannerImg = styled.div`
  background-position: 50%;
  background-size: cover;
  background-image: url("
  https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${(props) =>
    props.popularMoviesData.results[0].poster_path}
  ");
  top: 0;
  left: 0;
  opacity: 1;
  position: absolute;
  width: 100%;
  height: 100%;

  &:before {
    position: absolute;
    z-index: 15;
    content: "";
    min-height: 600px;
    height: 71.25vw;
    width: 100%;
    background: linear-gradient(to top, #141414, transparent);
    pointer-events: none;
  }

  @media (max-width: 768px) {
    background-position: top;
    background-image: url("
    https://www.themoviedb.org/t/p/w500${(props) =>
      props.popularMoviesData.results[0].poster_path}
    ");

    &:before {
      background: linear-gradient(to top, #141414, transparent);
    }
  }
`;

const Home = () => {
  const dispatch = useDispatch();
  const isMounted = useRef(false);

  const { popularMoviesData, topRatedMoviesData, upcomingMoviesData, loading } =
    useSelector((state) => state.movie);

  const { MovieDetailData } = useSelector((state) => state.movieDetail);

  const getMovieKeyForBanner = async () => {
    const API_KEY = process.env.REACT_APP_API_KEY;
    const movie_id =
      popularMoviesData.results && popularMoviesData.results[0].id;

    const selectedMovieJson = await api.get(
      `/movie/${movie_id}/videos?api_key=${API_KEY}&language=en-US`
    );

    let movieKeyForBanner = selectedMovieJson.data.results.find(
      (item) => item.name === "Official Trailer" || item.name === "Trailer"
    );

    movieKeyForBanner = movieKeyForBanner
      ? movieKeyForBanner.key
      : selectedMovieJson.data.results[0].key || null;

    dispatch({
      type: "STORE_MOVIE_KEY_FOR_BANNER_SUCCESS",
      payload: {
        movieKeyForBanner: movieKeyForBanner,
      },
    });

    dispatch(movieDetailActions.getMovieDetail(movie_id, 1));
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
  }, 4000);

  return loading ? (
    <div className="loadingSpinner">
      <FadeLoader color="red" loading={loading} size={15} speedMultiplier={3} />
    </div>
  ) : (
    <div className="home">
      <div className="banner_container">
        <div className="banner_container_text">
          <TextAnimation movie={MovieDetailData} />
        </div>

        <BannerImg popularMoviesData={popularMoviesData}>
          {bannerChange ? (
            <div className="bannerVideo_container">
              <MovieVideoForBanner />
            </div>
          ) : null}
        </BannerImg>
      </div>

      <h1>
        <span className="subTitle">&#10095;</span>
        <span>POPULAR MOVIES</span>
        {/* <span className="divide_line"></span> */}
      </h1>
      <MovieSlide movies={popularMoviesData.results} />
      <h1>
        <span className="subTitle">&#10095;</span>
        <span>TOP RATED MOVIES</span>
        {/* <span className="divide_line"></span> */}
      </h1>
      <MovieSlide movies={topRatedMoviesData.results} />
      <h1>
        <span className="subTitle">&#10095;</span>
        <span>UPCOMING MOVIES</span>
        {/* <span className="divide_line"></span> */}
      </h1>
      <MovieSlide movies={upcomingMoviesData.results} />
      <Footer />
    </div>
  );
};

export default Home;
