import api from "../api";

const API_KEY = process.env.REACT_APP_API_KEY;

// store에 각 arguments들이 저장되어 있다. ok
// api 콜 전에 해당 arguments들을 불러와야 한다.

// 현재 각 arguments들을 store에 저장하는데 있어서 각자 다른 case를 가진다
// 여러 case들을 통합하여 하나의 case로 묶고, 해당 case를 이용하면?
// 이때 이용은.....
// 먼저, store에 저장된 후, wrapper reducer에 또다시 dispatch 하여 값을 받아볼까?

// 불러온 arguments들을 getFilterMovies에 넣어 api콜을 해야 한다.

function getFilteredMovies(
  keyword,
  sortBy,
  withGenres,
  includeVideo,
  primaryReleaseDateGte,
  primaryReleaseDateLte,
  voteAverageGte,
  voteAverageLte
) {
  return async (dispatch) => {
    try {
      dispatch({ type: "GET_FILTERED_MOVIES_REQUEST" });

      console.log("keyword is", keyword);

      const FilteredMovies = await api.get(
        `/discover/movie?api_key=${API_KEY}&language=en-US&page=1${
          keyword ? `&with_text_query=${keyword}` : ""
        }${sortBy ? `&sort_by=${sortBy}` : ""}${
          includeVideo ? `&include_video=${includeVideo}` : ""
        }${
          primaryReleaseDateGte
            ? `&primary_release_date.gte=${primaryReleaseDateGte}`
            : ""
        }${
          primaryReleaseDateLte
            ? `&primary_release_date.lte=${primaryReleaseDateLte}`
            : ""
        }${voteAverageGte ? `&vote_average.gte=${voteAverageGte}` : ""}${
          voteAverageLte ? `&vote_averag.lte=${voteAverageLte}` : ""
        }`
      );

      // else if (
      //   keyword &&
      //   sortBy &&
      //   withGenres &&
      //   includeVideo &&
      //   primaryReleaseDateGte &&
      //   primaryReleaseDateLte
      // ) {
      //   return (FilteredMovies = await api.get(
      //     `/discover/movie?api_key=${API_KEY}&language=en-US&page=1&with_text_query=${keyword}&sort_by=${sortBy}&with_genres=${withGenres}&include_video=${includeVideo}&primary_release_date.gte=${primaryReleaseDateGte}&primary_release_date.lte=${primaryReleaseDateLte}`
      //   ));
      // } else if (keyword && sortBy && withGenres && includeVideo) {
      //   return (FilteredMovies = await api.get(
      //     `/discover/movie?api_key=${API_KEY}&language=en-US&page=1&with_text_query=${keyword}&sort_by=${sortBy}&with_genres=${withGenres}&include_video=${includeVideo}`
      //   ));
      // } else if (keyword && sortBy && withGenres) {
      //   return (FilteredMovies = await api.get(
      //     `/discover/movie?api_key=${API_KEY}&language=en-US&page=1&with_text_query=${keyword}&sort_by=${sortBy}&with_genres=${withGenres}`
      //   ));
      // } else if (keyword && sortBy) {
      //   return (FilteredMovies = await api.get(
      //     `/discover/movie?api_key=${API_KEY}&language=en-US&page=1&with_text_query=${keyword}&sort_by=${sortBy}`
      //   ));
      // } else if (keyword) {
      //   return (FilteredMovies = await api.get(
      //     `/discover/movie?api_key=${API_KEY}&language=en-US&page=1&with_text_query=${keyword}`
      //   ));
      // }

      // keyword만 있으면, 위 코드 실행
      // 이외의 arguments 있을시, discover api 실행

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
