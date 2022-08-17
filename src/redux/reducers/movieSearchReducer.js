let initialState = {
  getSearchedMoviesData: {},
  searchKeyword: {},
  loading: true,
};

function movieSearchReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case "GET_MOVIES_SEARCH_REQUEST":
      return { ...state };

    case "GET_SEARCHED_MOVIES_SUCCESS":
      return {
        ...state,
        getSearchedMoviesData: payload.getSearchedMoviesJson.data,
        loading: false,
      };

    case "GET_SEARCHED_MOVIES_FAILURE":
      // return alert(`Sorry,\n"${payload.error.message}"`);
      // return { ...state, message: "There's no movie you're looking for" };

      return (document.getElementById("MovieList_wrapper").innerHTML = `
      <h2 class="noResultMessage">
      There's no movie you're looking for
      </h2>
      `);

    case "SEARCH_KEYWORD_STORE_SUCCESS":
      return {
        ...state,
        searchKeyword: payload.keyword,
      };

    default:
      return { ...state };
  }
}

export default movieSearchReducer;
