let initialState = {
  SearchedMoviesData: {},
  searchKeyword: {},
  loading: true,
};

function movieSearchReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case "GET_MOVIES_SEARCH_REQUEST":
      return { ...state };

    case "GET_MOVIES_SEARCH_SUCCESS":
      return {
        ...state,
        SearchedMoviesData: payload.SearchedMoviesJson.data,
        loading: false,
      };

    case "GET_MOVIES_SEARCH_FAILURE":
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
        searchKeyword: payload.keyword,
      };

    case "RESET_MOVIES_SEARCH_SUCCESS":
      return {
        ...state,
        SearchedMoviesData: {},
        searchKeyword: {},
        loading: true,
      };

    default:
      return { ...state };
  }
}

export default movieSearchReducer;
