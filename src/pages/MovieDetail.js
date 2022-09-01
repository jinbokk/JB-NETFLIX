import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { movieDetailActions } from "../redux/actions/movieDetailActions";
import { FadeLoader } from "react-spinners";
import api from "../redux/api";
import MovieReview from "../component/MovieReview";
import MovieSlide from "../component/MovieSlide";
import MovieVideo from "../component/MovieVideo";
import MovieVideoForBanner from "../component/MovieVideoForBanner";
import TextAnimation from "../component/TextAnimation";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";

const MovieDetail = () => {
  const dispatch = useDispatch();

  const movie_id = useParams().id;

  useEffect(() => {
    dispatch(movieDetailActions.getMovieDetail(movie_id, 1));
    return () => {
      dispatch({ type: "RESET_MOVIE_DETAIL_STORE_SUCCESS" });
    };
  }, [movie_id]);

  const {
    MovieDetailData,
    MovieReviews,
    RecommendMovies,
    SimilarMovies,
    loading,
  } = useSelector((state) => state.movieDetail);

  // const [animate, setAnimate] = useState(false);
  // const animateTrigger = () => {
  //   setAnimate(true);
  //   console.log("animation fire");
  // };

  // setTimeout(() => {
  //   animateTrigger();
  // }, 1000);

  const getMovieKeyForBanner = async () => {
    const API_KEY = process.env.REACT_APP_API_KEY;
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
    getMovieKeyForBanner();
    return () => {
      dispatch({
        type: "RESET_MOVIE_KEY_SUCCESS",
      });
      dispatch({
        type: "RESET_MOVIE_KEY_FOR_BANNER_SUCCESS",
      });
    };
  }, [movie_id]);

  return loading ? (
    <div className="loadingSpinner">
      <FadeLoader color="red" loading={loading} size={15} speedMultiplier={3} />
    </div>
  ) : (
    <>
      <div className="MovieDetail_container">
        <TextAnimation props={MovieDetailData} />
        <div
          className="MovieDetail_Img"
          style={{
            backgroundImage:
              "url(" +
              `https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${MovieDetailData.poster_path}` +
              ")",
          }}
        >
          <MovieVideoForBanner />
        </div>
      </div>

      <div className="MovieDetail_section">
        <h1
          style={{
            paddingLeft: "10px",
            position: "relative",
            zIndex: "1",
            fontSize: "25px",
          }}
        >
          <span className="subTitle">&#10095;</span>
          REVIEWS
        </h1>
        <Row>
          {MovieReviews.data.total_results !== 0 ? (
            MovieReviews.data.results.map((item) => {
              if (
                item.author_details.avatar_path !== null &&
                item.author_details.avatar_path.includes("https") === true
              ) {
                let avatar_path = item.author_details.avatar_path.slice(32);
                return (
                  <Col lg={4}>
                    <MovieReview avatar_path={avatar_path} item={item} />
                  </Col>
                );
              } else if (item.author_details.avatar_path == null) {
                let avatar_path = "";
                return (
                  <Col lg={4}>
                    <MovieReview avatar_path={avatar_path} item={item} />
                  </Col>
                );
              } else {
                let avatar_path = item.author_details.avatar_path;
                console.log("avatar_path is", avatar_path);
                return (
                  <Col lg={4}>
                    <MovieReview avatar_path={avatar_path} item={item} />
                  </Col>
                );
              }
            })
          ) : (
            <h3
              style={{
                textAlign: "center",
                fontSize: "30px",
                padding: "30px",
                width: "100%",
              }}
            >
              No Reviews
            </h3>
          )}
        </Row>

        <div>
          <h1
            style={{
              paddingLeft: "10px",
              position: "relative",
              zIndex: "1",
              fontSize: "25px",
            }}
          >
            <span className="subTitle">&#10095;</span>
            SIMILAR MOVIES
          </h1>
          <MovieSlide movies={SimilarMovies.data.results} />
        </div>

        <div>
          <h1
            style={{
              paddingLeft: "10px",
              position: "relative",
              zIndex: "1",
              fontSize: "25px",
            }}
          >
            <span className="subTitle">&#10095;</span>
            RECOMMEND MOVIES
          </h1>
          {RecommendMovies.data.total_results !== 0 ? (
            <MovieSlide movies={RecommendMovies.data.results} />
          ) : (
            <h3
              style={{
                textAlign: "center",
                fontSize: "30px",
                padding: "30px",
                width: "100%",
              }}
            >
              No Recommend Movies
            </h3>
          )}
        </div>
      </div>
    </>
  );
};

export default MovieDetail;
