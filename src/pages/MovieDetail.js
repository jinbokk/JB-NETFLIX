import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { movieDetailActions } from "../redux/actions/movieDetailActions";
import { FadeLoader } from "react-spinners";
import MovieReview from "../component/MovieReview";

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

      {MovieReviews.data.results.map((item) => {
        if (
          item.author_details.avatar_path !== null &&
          item.author_details.avatar_path.includes("https") === true
        ) {
          let avatar_path = item.author_details.avatar_path.slice(32);
          return <MovieReview avatar_path={avatar_path} item={item} />;
        } else if (item.author_details.avatar_path == null) {
          let avatar_path = "";
          return <MovieReview avatar_path={avatar_path} item={item} />;
        } else {
          let avatar_path = item.author_details.avatar_path;
          console.log("avatar_path is", avatar_path);
          return <MovieReview avatar_path={avatar_path} item={item} />;
        }
      })}
    </>
  );
};

export default MovieDetail;
