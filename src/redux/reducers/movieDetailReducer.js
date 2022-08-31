let initialState = {
  MovieDetailData: {},
  MovieVideos: {},
  MovieVideosForBanner: {},
  MovieReviews: {},
  RecommendMovies: {},
  SimilarMovies: {},
  loading: true,
};

function movieDetailReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case "GET_MOVIE_DETAIL_REQUEST":
      return { ...state };

    case "GET_MOVIE_DETAIL_SUCCESS":
      return {
        ...state,
        MovieDetailData: payload.MovieDetailJson.data,
        MovieVideos: payload.MovieVideos,
        MovieVideosForBanner: payload.MovieVideosForBanner,
        MovieReviews: payload.MovieReviews,
        RecommendMovies: payload.RecommendMovies,
        SimilarMovies: payload.SimilarMovies,
        loading: false,
      };

    case "RESET_MOVIE_DETAIL_STORE_SUCCESS":
      return {
        ...state,
        MovieDetailData: {},
        MovieVideos: {},
        MovieReviews: {},
        RecommendMovies: {},
        SimilarMovies: {},
        loading: true,
      };

      case "RESET_MOVIE_VIDEOS_SUCCESS":
      return {
        ...state,
        MovieVideos: {},
      }

    case "GET_MOVIE_DETAIL_FAILURE":
      return alert(`Sorry,\n"${payload.error.message}"`);

    default:
      return { ...state };
  }
}

export default movieDetailReducer;
