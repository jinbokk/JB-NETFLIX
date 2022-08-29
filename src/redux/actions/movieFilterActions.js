import api from "../api";

const getFilteredMovies = (
  keyword,
  sortBy,
  withGenres,
  includeVideo,
  releaseDateGte,
  releaseDateLte,
  voteAverageGte,
  voteAverageLte
) => {
  
  console.log("TEEEESSTT KEYWORD IS", keyword);
  console.log("TEEEESSTT releaseDateGte IS", releaseDateGte);
  const API_KEY = process.env.REACT_APP_API_KEY;

  return async (dispatch) => {
    try {
      console.log("REQUEST STARTED!!!!!!!");

      dispatch({ type: "GET_FILTERED_MOVIES_REQUEST" });

      const FilteredMovies = await api.get(
        `/discover/movie?api_key=${API_KEY}&language=en-US&page=1${
          keyword ? `&with_text_query=${keyword}` : ""
        }${
          includeVideo ? `&include_video=${includeVideo}` : ""
        }${releaseDateGte ? `&release_date.gte=${releaseDateGte}` : ""}${
          releaseDateLte ? `&release_date.lte=${releaseDateLte}` : ""
        }${voteAverageGte ? `&vote_average.gte=${voteAverageGte}` : ""}${
          voteAverageLte ? `&vote_average.lte=${voteAverageLte}` : ""
        }`
      );

      dispatch({
        type: "GET_FILTERED_MOVIES_SUCCESS",
        payload: {
          FilteredMoviesJson: FilteredMovies,
        },
      });
    } catch (error) {
      dispatch({ type: "GET_FILTERED_MOVIES_FAILURE", payload: { error } });
    }
  };
};

export const movieFilterActions = {
  getFilteredMovies,
};