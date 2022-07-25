let initialState = {
  popularMoviesData: {},
  topRatedMoviesData: {},
  upcomingMoviesData: {},
  loading: true,
  movieID: {},
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
        loading: false,
      };

    case "STORE_MOVIE_ID_SUCCESS":
      return {
        ...state,
        movieID: payload.movieID,
      };

    case "GET_MOVIES_FAILURE":
      return alert(`Sorry,\n"${payload.error.message}"`);

    default:
      return { ...state };
  }
}

export default movieReducer;
