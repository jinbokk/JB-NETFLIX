import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { movieDetailActions } from "../redux/actions/movieDetailActions";
import { FadeLoader } from "react-spinners";
import { movieActions } from "../redux/actions/movieActions";
import api from "../redux/api";
import MovieReview from "../component/MovieReview";
import MovieSlide from "../component/MovieSlide";
import MovieVideoForBanner from "../component/MovieVideoForBanner";
import TextAnimation from "../component/TextAnimation";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Footer from "../component/Footer";
import styled from "styled-components";

const BannerImg = styled.div`
  background-position: 50%;
  background-size: cover;
  background-image: url("
  https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${(props) =>
    props.MovieDetailData.poster_path}
  ");
  left: 0;
  top: 0;
  opacity: 1;
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 1;

  @media (max-width: 768px) {
    background-position: top;
    background-image: url("
    https://www.themoviedb.org/t/p/w500${(props) =>
      props.MovieDetailData.poster_path}
    ");
  }
`;

const MovieDetail = () => {
  const dispatch = useDispatch();

  const movie_id = useParams().id;

  const API_KEY = process.env.REACT_APP_API_KEY;

  const getGenres = api.get(
    `/genre/movie/list?api_key=${API_KEY}&language=en-US&region=US`
  );

  const {
    MovieDetailData,
    MovieReviews,
    RecommendMovies,
    SimilarMovies,
    loading,
  } = useSelector((state) => state.movieDetail);

  const getMovieKeyForBanner = async () => {
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

  const [bannerChange, setBannerChange] = useState(false);

  useEffect(() => {
    setBannerChange(false);
    const isTimeout = setTimeout(() => {
      setBannerChange(true);
    }, 3000);

    dispatch({ type: "STORE_GENRE_LIST_SUCCESS", payload: getGenres });
    dispatch(movieDetailActions.getMovieDetail(movie_id, 1));
    dispatch(movieActions.getMovies());
    getMovieKeyForBanner();

    return () => {
      dispatch({
        type: "RESET_MOVIE_KEY_SUCCESS",
      });
      dispatch({
        type: "RESET_MOVIE_KEY_FOR_BANNER_SUCCESS",
      });
      dispatch({ type: "RESET_MOVIE_DETAIL_STORE_SUCCESS" });
    };
  }, [movie_id]);

  return loading ? (
    <div className="loadingSpinner">
      <FadeLoader color="red" loading={loading} size={15} speedMultiplier={3} />
    </div>
  ) : (
    <>
      <div className="MovieDetail_container">
        <div className="MovieDetail_container_text">
          <TextAnimation movie={MovieDetailData} />
        </div>
        {}
        <BannerImg MovieDetailData={MovieDetailData}>
          <div className="MovieDetail_video">
            {bannerChange ? <MovieVideoForBanner /> : null}
          </div>
        </BannerImg>
      </div>

      <div className="MovieDetail_section">
        <h1>
          <span className="subTitle">&#10095;</span>
          <span>OVERVIEW</span>
          <span className="divide_line"></span>
        </h1>

        <div className="MovieDetail_section_overview">
          {MovieDetailData.overview}
        </div>

        <h1>
          <span className="subTitle">&#10095;</span>
          <span>REVIEWS</span>
          <span className="divide_line"></span>
        </h1>
        <Row>
          {MovieReviews.data.total_results !== 0 ? (
            MovieReviews.data.results.map((item, index) => {
              if (
                item.author_details.avatar_path !== null &&
                item.author_details.avatar_path.includes("https") === true
              ) {
                let avatar_path = item.author_details.avatar_path.slice(32);
                return (
                  <Col lg={4} key={index}>
                    <MovieReview avatar_path={avatar_path} item={item} />
                  </Col>
                );
              } else if (item.author_details.avatar_path == null) {
                let avatar_path = "";
                return (
                  <Col lg={4} key={index}>
                    <MovieReview avatar_path={avatar_path} item={item} />
                  </Col>
                );
              } else {
                let avatar_path = item.author_details.avatar_path;
                return (
                  <Col lg={4} key={index}>
                    <MovieReview avatar_path={avatar_path} item={item} />
                  </Col>
                );
              }
            })
          ) : (
            <h3
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                color: "#777777",
                minHeight: "100px",
              }}
            >
              No Reviews
            </h3>
          )}
        </Row>

        <div>
          <h1>
            <span className="subTitle">&#10095;</span>
            <span>SIMILAR MOVIES</span>
            <span className="divide_line"></span>
          </h1>
          <MovieSlide movies={SimilarMovies.data.results} />
        </div>

        <div>
          <h1>
            <span className="subTitle">&#10095;</span>
            <span>RECOMMEND MOVIES</span>
            <span className="divide_line"></span>
          </h1>
          {RecommendMovies.data.total_results !== 0 ? (
            <MovieSlide movies={RecommendMovies.data.results} />
          ) : (
            <h3
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                color: "#777777",
                minHeight: "150px",
              }}
            >
              Sorry, No movie recommendations
            </h3>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MovieDetail;
