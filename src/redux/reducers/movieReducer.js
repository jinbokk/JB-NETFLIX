let initialState = {
  popularMoviesData: {},
  topRatedMoviesData: {},
  upcomingMoviesData: {},
  // popularMoviesVideo: {},
  // topRatedMoviesVideo: {},
  // upcomingMoviesVideo: {},
};

function movieReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case "GET_MOVIES_SUCCESS":
      return {
        ...state,
        popularMoviesData: payload.popularMoviesJson.data,
        topRatedMoviesData: payload.topRatedMoviesJson.data,
        upcomingMoviesData: payload.upcomingMoviesJson.data,
        // popularMoviesVideo: payload.popularMoviesJson.data.results.id,
        // topRatedMoviesVideo: payload.topRatedMoviesJson.data.results.id,
        // upcomingMoviesVideo: payload.upcomingMoviesJson.data.results.id,
      };
    default:
      return { ...state };
  }
}

export default movieReducer;
