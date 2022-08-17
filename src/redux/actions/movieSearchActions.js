import api from "../api";

const API_KEY = process.env.REACT_APP_API_KEY;

function getSearchedMovies(query, pageNum) {
  return async (dispatch) => {
    try {
      dispatch({ type: "GET_MOVIES_SEARCH_REQUEST" });

      const SearchedMovies = await api.get(
        `/search/movie?api_key=${API_KEY}&language=en-US&page=${pageNum}&query=${query}`
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
