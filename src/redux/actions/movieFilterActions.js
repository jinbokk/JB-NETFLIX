import { useSelector } from "react-redux";
import MovieFilterArgument from "../../component/MovieFilterArgument";
import api from "../api";

const API_KEY = process.env.REACT_APP_API_KEY;

// let {
//   keyword,
//   withGenres,
//   includeVideo,
//   primaryReleaseDateGte,
//   primaryReleaseDateLte,
//   voteAverageGte,
//   voteAverageLte,
// } = MovieFilterArgument();

// store에 각 arguments들이 저장되어 있다.
// api 콜 전에 해당 arguments들을 불러와야 한다
// 불러온 arguments들을 getFilterMovies에 넣어 api콜을 해야 한다.

function getFilteredMovies(keyword) {
  return async (dispatch) => {
    try {
      dispatch({ type: "GET_FILTERED_MOVIES_REQUEST" });

      console.log("keyword is", keyword);

      const FilteredMovies = await api.get(
        // `/discover/movie?api_key=${API_KEY}&language=en-US&query=${keyword}&page=1`
        `/search/movie?api_key=${API_KEY}&language=en-US&page=1&include_adult=false&query=${keyword}`
      );
      // const FilteredMovies = await api.get(
      //   `/discover/movie?api_key=${API_KEY}&language=en-US&with_keywords=${keyword}&with_genres=${withGenres}&include_video=${includeVideo}
      //   &primary_release_date.gte=${primaryReleaseDateGte}&primary_release_date.lte=${primaryReleaseDateLte}&page=1`
      // );

      console.log("after api call data is", FilteredMovies);

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
}

export const movieFilterActions = {
  getFilteredMovies,
};
