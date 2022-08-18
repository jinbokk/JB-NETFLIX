let initialState = {
  SearchedMoviesData: {},
  keyword: {},
  loading: true,
  sortBy: {},
  withGenres: [],
  includeVideo: {},
  primaryReleaseDateGte: {},
  primaryReleaseDateLte: {},
};

function movieSearchReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case "STORE_MOVIES_SEARCH_PARAMS_SUCCESS": {
      return { ...state, withGenres: [payload.value, ...state.withGenres] };

      //   const index = state.withGenres.findIndex(
      //     (genres) => genres.index !== payload.index
      //   ); //finding index of the item
      //   const newArray = [...state.withGenres]; //making a new array
      //   // newArray[index].toggle = false; //changing value in the new array
      //   return {
      //     ...state, //copying the orignal state
      //     withGenres: newArray,
      //   }; //reassingning withGenres to new array
    }

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
        keyword: payload.keyword,
      };

    case "RESET_MOVIES_SEARCH_SUCCESS":
      return {
        ...state,
        SearchedMoviesData: {},
        keyword: {},
        loading: true,
      };

    default:
      return { ...state };
  }
}

export default movieSearchReducer;
