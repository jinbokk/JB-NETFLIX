import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { movieDetailActions } from "../redux/actions/movieDetailActions";

const MovieDetail = () => {
  const movie_id = useParams().id;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "STORE_MOVIE_ID_SUCCESS", payload: movie_id });
    movieDetailActions.getMovieDetail(movie_id);
  }, []);

  const { popularMoviesData, topRatedMoviesData, upcomingMoviesData, loading } =
    useSelector((state) => state.movie);

  const {
    MovieDetailJson,
    MovieVideos,
    MovieReviews,
    RecommendMovies,
    SimilarMovies,
  } = useSelector((state) => state.movieDetail);

  console.log(MovieDetailJson);

  // useEffect(() => {
  //   getMovieDetail();
  // }, []);

  return (
    <div>
      {console.log(movie_id)}
      {console.log(MovieDetailJson)}
      {console.log(MovieVideos)}
      {console.log(MovieReviews)}
      {console.log(RecommendMovies)}
      {console.log(SimilarMovies)}

      {console.log(popularMoviesData)}
      {console.log(topRatedMoviesData)}
      {console.log(upcomingMoviesData)}
      {console.log(loading)}
    </div>
  );
};

export default MovieDetail;
