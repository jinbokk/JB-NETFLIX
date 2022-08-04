let initialState = {
  popularMoviesData: {},
  topRatedMoviesData: {},
  upcomingMoviesData: {},
  loading: true,
  movieId: {},
  movieKey: {},
  genreList: {},
  NowPlayingMoviesData: {},
};

function movieReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case "GET_MOVIES_REQUEST":
      return { ...state };

    case "GET_MOVIES_SUCCESS":
      return {
        ...state,
        popularMoviesData: payload.popularMoviesJson.data,
        topRatedMoviesData: payload.topRatedMoviesJson.data,
        upcomingMoviesData: payload.upcomingMoviesJson.data,
        genreListData: payload.movieGenresJson.data,
        NowPlayingMoviesData: payload.NowPlayingMoviesJson.data,
        loading: false,
      };

    case "STORE_MOVIE_KEY_SUCCESS":
      return {
        ...state,
        movieKey: payload.movieKey,
      };

    case "STORE_MOVIE_ID_SUCCESS":
      return {
        ...state,
        movieId: payload.movie_id,
      };

    // case "GET_MOVIE_DETAIL_REQUEST":
    //   return { ...state };

    // case "GET_MOVIE_DETAIL_SUCCESS":
    //   return {
    //     ...state,
    //     MovieDetailJson: payload.MovieDetailJson.data,
    //     MovieVideos: payload.MovieVideos,
    //     MovieReviews: payload.MovieReviews,
    //     RecommendMovies: payload.RecommendMovies,
    //     SimilarMovies: payload.SimilarMovies,
    //     loading: false,
    //   };

    case "GET_MOVIES_FAILURE":
      return alert(`Sorry,\n"${payload.error.message}"`);

    default:
      return { ...state };
  }
}

export default movieReducer;
