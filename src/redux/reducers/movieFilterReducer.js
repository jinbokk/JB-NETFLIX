let initialState = {
  FilteredMoviesData: {},
  keyword: "",
  loading: true,
  sortBy: {},
  withGenres: "",
  includeVideo: "",
  releaseDateGte: "",
  releaseDateLte: "",
  voteAverageGte: "",
  voteAverageLte: "",
};

function movieFilterReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case "STORE_MOVIE_GENRES_SUCCESS": {
      return { ...state, withGenres: payload };
    }

    case "GET_FILTERED_MOVIES_REQUEST":
      return { ...state };

    case "GET_FILTERED_MOVIES_SUCCESS":
      return {
        ...state,
        FilteredMoviesData: payload.FilteredMoviesJson.data,
        loading: false,
      };

    case "GET_FILTERED_MOVIES_FAILURE":
      return alert(
        `Sorry, "${payload.error.message}"\nPlease enter the movie name`
      );
    // return alert(`Sorry,\n"${payload.error.message}"`);

    // return (document.getElementById(
    //   'MovieList_wrapper'
    // ).innerHTML = `<h2 class="noResultMessage">Please enter the movie name</h2>`);

    case "SEARCH_KEYWORD_STORE_SUCCESS":
      return {
        ...state,
        keyword: payload,
      };

    case "RELEASE_DATE_FILTER_STORE_SUCCESS":
      return {
        ...state,
        releaseDateGte: payload.date_gte,
        releaseDateLte: payload.date_lte,
      };

    case "SCORE_FILTER_STORE_SUCCESS":
      return {
        ...state,
        voteAverageGte: payload.vote_gte,
        voteAverageLte: payload.vote_lte,
      };

    case "INCLUDE_MOVIE_VIDEO_TOGGLE_SUCCESS":
      return {
        ...state,
        includeVideo: payload,
      };

    case "RESET_MOVIES_SEARCH_SUCCESS":
      return {
        ...state,
        FilteredMoviesData: {},
        keyword: {},
        loading: true,
      };

    // case "RESET_FILTERED_MOVIES_STORE_SUCCESS":
    // return {
    //   ...state,
    //   FilteredMoviesData: {}
    // };

    default:
      return { ...state };
  }
}

export default movieFilterReducer;
