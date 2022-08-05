import api from "../api";
import { useSelector } from "react-redux";
// import { useEffect } from "react";
// import { movieActions } from "./movieActions";
// import { useDispatch } from "react-redux";

function getMovieDetail() {
  const API_KEY = process.env.REACT_APP_API_KEY;

  // const dispatch = useDispatch();

  useEffect(() => {
    movieActions.getMovies();
  }, []);

  const movie_id = useSelector((state) => state.movie.movieId);

  return async (dispatch) => {
    try {
      dispatch({ type: "GET_MOVIE_DETAIL_REQUEST" });

      const getMovieDetailJson = api.get(
        `/movie/${movie_id}?api_key=${API_KEY}&language=en-US`
      );

      const getMovieVideos = api.get(
        `/movie/${movie_id}/videos?api_key=${API_KEY}&language=en-US`
      );

      const getMovieReviews = api.get(
        `/movie/${movie_id}/reviews?api_key=${API_KEY}&language=en-US&page=1`
      );

      const getRecommendMovies = api.get(
        `/movie/${movie_id}/recommendations?api_key=${API_KEY}&language=en-US&page=1`
      );

      const getSimilarMovies = api.get(
        `/movie/${movie_id}/similar?api_key=${API_KEY}&language=en-US&page=11`
      );

      const [
        MovieDetailJson,
        MovieVideos,
        MovieReviews,
        RecommendMovies,
        SimilarMovies,
      ] = await Promise.all([
        getMovieDetailJson,
        getMovieVideos,
        getMovieReviews,
        getRecommendMovies,
        getSimilarMovies,
      ]);

      dispatch({
        type: "GET_MOVIE_DETAIL_SUCCESS",
        payload: {
          MovieDetailJson: MovieDetailJson,
          MovieVideos: MovieVideos,
          MovieReviews: MovieReviews,
          RecommendMovies: RecommendMovies,
          SimilarMovies: SimilarMovies,
        },
      });
    } catch (error) {
      dispatch({ type: "GET_MOVIE_DETAIL_FAILURE", payload: { error } });
    }
  };
}

export const movieDetailActions = {
  getMovieDetail,
};
