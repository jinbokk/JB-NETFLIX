import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { movieDetailActions } from "../redux/actions/movieDetailActions";
import { FadeLoader } from "react-spinners";
import api from "../redux/api";
import MovieReview from "../component/MovieReview";
import MovieSlide from "../component/MovieSlide";
import MovieVideo from "../component/MovieVideo";
import TextAnimation from "../component/TextAnimation";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";

const MovieDetail = () => {
  const dispatch = useDispatch();

  const movie_id = useParams().id;

  useEffect(() => {
    dispatch(movieDetailActions.getMovieDetail(movie_id));
    return () => {
      dispatch({ type: "MOVIE_DETAIL_INITIALIZE" });
    };
  }, [movie_id]);

  const {
    MovieDetailData,
    MovieVideos,
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

  const getMovieKey = async () => {
    const API_KEY = process.env.REACT_APP_API_KEY;
    const selectedMovieJson = await api.get(
      `/movie/${movie_id}/videos?api_key=${API_KEY}&language=en-US`
    );
    const movieKey = selectedMovieJson.data.results[0].key;

    dispatch({
      type: "STORE_MOVIE_KEY_SUCCESS",
      payload: {
        movieKey: movieKey,
      },
    });
  };

  useEffect(() => {
    getMovieKey();
    return () => {
      dispatch({
        type: "STORE_MOVIE_KEY_SUCCESS",
        payload: {
          movieKey: {},
        },
      });
    };
  }, []);

  return loading ? (
    <div className="loadingSpinner">
      <FadeLoader color="red" loading={loading} size={15} speedMultiplier={3} />
    </div>
  ) : (
    <>
      <div className="MovieDetail_container">
        <div
          className="MovieDetail_Img"
          style={{
            backgroundImage:
              "url(" +
              `https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${MovieDetailData.poster_path}` +
              ")",
          }}
        ></div>
        <MovieVideo />
        <TextAnimation props={MovieDetailData} />
      </div>

      <div className="MovieDetail_section">
        <h1>
          <span className="subTitle">&#10095;</span>
          REVIEWS
        </h1>
        <Row>
          {MovieReviews.data.results.map((item) => {
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
          })}
        </Row>
      </div>
      <div>
        <h1>
          <span>
            <span className="subTitle">&#10095;</span>
          </span>
          SIMILAR MOVIES
        </h1>
        <MovieSlide movies={SimilarMovies.data.results} />
      </div>

      <div>
        <h1>
          <span>
            <span className="subTitle">&#10095;</span>
          </span>
          RECOMMEND MOVIES
        </h1>
        <MovieSlide movies={RecommendMovies.data.results} />
      </div>
    </>
  );
};

export default MovieDetail;
