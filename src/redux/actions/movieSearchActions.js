import api from "../api";

const API_KEY = process.env.REACT_APP_API_KEY;
// let keyWord;
// let sortBy;
// let withGenres;
// let includeVideo;
// let primaryReleaseDateGte;
// let primaryReleaseDateLte;

function getSearchedMovies(
  keyWord,
  sortBy,
  withGenres,
  includeVideo,
  primaryReleaseDateGte,
  primaryReleaseDateLte
) {
  return async (dispatch) => {
    try {
      dispatch({ type: "GET_MOVIES_SEARCH_REQUEST" });

      const SearchedMovies = await api.get(
        `/discover/movie?api_key=${API_KEY}&language=en-US&with_keywords=${keyWord}&sort_by=${sortBy}&with_genres=${withGenres}&include_video=${includeVideo}
        &primary_release_date.gte=${primaryReleaseDateGte}&primary_release_date.lte=${primaryReleaseDateLte}&page=1`
      );

      dispatch({
        type: "GET_MOVIES_SEARCH_SUCCESS",
        payload: {
          SearchedMoviesJson: SearchedMovies,
        },
      });
    } catch (error) {
      dispatch({ type: "GET_MOVIES_SEARCH_FAILURE", payload: { error } });
    }
  };
}

export const movieSearchActions = {
  getSearchedMovies,
};
