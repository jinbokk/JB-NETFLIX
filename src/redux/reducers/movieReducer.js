let initialState = {
  popularMoviesData: {},
  topRatedMoviesData: {},
  upcomingMoviesData: {},
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
      };
    default:
      return { ...state };
  }
}

export default movieReducer;
