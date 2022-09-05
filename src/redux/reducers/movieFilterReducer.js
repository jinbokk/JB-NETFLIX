let initialState = {
  moreMoviesData: {},
  moreMoviesDataLoading: false,
  filteredMoviesData: {},
  // 현재 단일 데이터가 받아와지는 중.
  // 이것을 array로 변환하여 계속 이어붙이기 하도록 해야할 듯.
  // 1. filteredMoviesData를 MOREMoviesData에 concat 한다.
  keyword: "",
  loading: true,
  sortBy: "",
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

    case "STORE_MOVIE_SORT_SUCCESS": {
      return { ...state, sortBy: payload };
    }

    case "GET_FILTERED_MOVIES_REQUEST":
      return { ...state };

    case "GET_FILTERED_MOVIES_SUCCESS":
      return {
        ...state,
        filteredMoviesData: payload.FilteredMoviesJson.data,
        genreListData: payload.movieGenresJson.data,
        loading: false,
      };

    case "GET_MORE_MOVIES_REQUEST":
      return {
        ...state,
        moreMoviesDataLoading: true,
      };

    case "GET_MORE_MOVIES_SUCCESS":
      return {
        ...state,
        moreMoviesData: payload,
        moreMoviesDataLoading: false,
      };

    case "GET_FILTERED_MOVIES_FAILURE":
      return alert(
        `Sorry, "${payload.error.message}"\nPlease enter the movie name`
      );

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
        filteredMoviesData: {},
        keyword: {},
        loading: true,
      };

    default:
      return { ...state };
  }
}

export default movieFilterReducer;
