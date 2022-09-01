import api from "../api";

function getMovieDetail(movie_id, pageNum) {
  const API_KEY = process.env.REACT_APP_API_KEY;
  return async (dispatch) => {
    try {
      dispatch({ type: "GET_MOVIE_DETAIL_REQUEST" });

      const getMovieDetailJson = api.get(
        `/movie/${movie_id}?api_key=${API_KEY}&language=en-US&region=US`
      );

      const getMovieVideos = api.get(
        `/movie/${movie_id}/videos?api_key=${API_KEY}&language=en-US&region=US`
      );

      const getMovieReviews = api.get(
        `/movie/${movie_id}/reviews?api_key=${API_KEY}&language=en-US&page=${pageNum}&region=US`
      );

      const getRecommendMovies = api.get(
        `/movie/${movie_id}/recommendations?api_key=${API_KEY}&language=en-US&page=${pageNum}&region=US`
      );

      const getSimilarMovies = api.get(
        `/movie/${movie_id}/similar?api_key=${API_KEY}&language=en-US&page=${pageNum}&region=US`
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
