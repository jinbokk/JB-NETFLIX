import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { movieDetailActions } from "../redux/actions/movieDetailActions";
import { FadeLoader } from "react-spinners";

const MovieDetail = () => {
  const dispatch = useDispatch();

  const movie_id = useParams().id;

  useEffect(() => {
    dispatch(movieDetailActions.getMovieDetail(movie_id));
    return () => {
      dispatch({ type: "MOVIE_DETAIL_INITIALIZE" });
    };
  }, []);

  const {
    MovieDetailData,
    MovieVideos,
    MovieReviews,
    RecommendMovies,
    SimilarMovies,
    loading,
  } = useSelector((state) => state.movieDetail);

  return loading ? (
    <div className="loadingSpinner">
      <FadeLoader color="red" loading={loading} size={15} speedMultiplier={3} />
    </div>
  ) : (
    <>
      <div
        className="movie_detail_img"
        style={{
          backgroundImage:
            "url(" +
            `https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${MovieDetailData.poster_path}` +
            ")",
        }}
      ></div>
      <h1>{MovieDetailData.original_title}</h1>
      <p>{MovieDetailData.overview}</p>
      {MovieDetailData.genres.map((item) => (
        <span>{item.name}/</span>
      ))}
      {MovieReviews.data.results.map((item) => (
        <>
          <div
            style={{
              width: 100,
              height: 100,
              backgroundImage:
                "url(" + `${item.author_details.avatar_path}` + ")",
            }}
          ></div>
          <span>{item.author}</span>
        </>
      ))}
    </>
  );
};

export default MovieDetail;
