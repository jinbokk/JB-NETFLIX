let initialState = {
  popularMoviesData: {},
  topRatedMoviesData: {},
  upcomingMoviesData: {},
  loading: true,
  // popularMoviesVideo: {},
  // topRatedMoviesVideo: {},
  // upcomingMoviesVideo: {},
};

function movieReducer(state = initialState, action) {
  const { type, payload } = action;
  
  switch (type) {
    case "GET_MOVIES_REQUEST":
      return { ...state};

    case "GET_MOVIES_SUCCESS":
      return {
        ...state,
        popularMoviesData: payload.popularMoviesJson.data,
        topRatedMoviesData: payload.topRatedMoviesJson.data,
        upcomingMoviesData: payload.upcomingMoviesJson.data,
        loading: false,
        // popularMoviesVideo: payload.popularMoviesJson.data.results.id,
        // topRatedMoviesVideo: payload.topRatedMoviesJson.data.results.id,
        // upcomingMoviesVideo: payload.upcomingMoviesJson.data.results.id,
      };

    case "GET_MOVIES_FAILURE":
      return alert("Something went wrong", payload.error);

    default:
      return { ...state };
  }
}

export default movieReducer;
