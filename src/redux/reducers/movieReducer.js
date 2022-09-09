let initialState = {
  popularMoviesData: {},
  topRatedMoviesData: {},
  upcomingMoviesData: {},
  loading: true,
  movieId: {},
  movieKey: {},
  movieKeyForBanner: {},
  genreListData: {},
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

    case "STORE_MOVIE_KEY_FOR_BANNER_SUCCESS":
      return {
        ...state,
        movieKeyForBanner: payload.movieKeyForBanner,
      };

    case "RESET_MOVIE_KEY_SUCCESS":
      return {
        ...state,
        movieKey: {},
      };

    case "RESET_MOVIE_KEY_FOR_BANNER_SUCCESS":
      return {
        ...state,
        movieKeyForBanner: {},
      };

    case "RESET_MOVIE_STORE_SUCCESS":
      return {
        ...state,
        popularMoviesData: {},
        topRatedMoviesData: {},
        upcomingMoviesData: {},
        loading: true,
        movieId: {},
        movieKey: {},
        genreListData: {},
        NowPlayingMoviesData: {},
      };

    case "GET_MOVIES_FAILURE":
      return alert(`Sorry,\n"${payload.error.message}"`);

    default:
      return { ...state };
  }
}

export default movieReducer;
