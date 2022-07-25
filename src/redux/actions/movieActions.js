import api from "../api";

const API_KEY = process.env.REACT_APP_API_KEY;

function getMovies() {
  return async (dispatch) => {
    try {
      dispatch({ type: "GET_MOVIES_REQUEST" });

      const getPopularMovies = api.get(
        `/popular?api_key=${API_KEY}&language=en-US&page=1`
      );

      const getTopRatedMovies = api.get(
        `/top_rated?api_key=${API_KEY}&language=en-US&page=1`
      );

      const getUpcomingMovies = api.get(
        `/upcoming?api_key=${API_KEY}&language=en-US&page=1`
      );

      const [popularMoviesJson, topRatedMoviesJson, upcomingMoviesJson] =
        await Promise.all([
          getPopularMovies,
          getTopRatedMovies,
          getUpcomingMovies,
        ]);

      // movieVideo를 get 하기 위해서는, movie_id를 먼저 가져와야 한다.
      // 각 movie들을 promise.all 해서 가져온 데이터에서, movie id를 추출한다.
      // 추출한 movie id를 getMovieVideo api에 적용시킨다.

      // const movie_id = [
      //   popularMoviesJson.data.results[0].id,
      //   topRatedMoviesJson.data.results[0].id,
      //   upcomingMoviesJson.data.results[0].id,
      // ];

      // console.log(movie_id);

      // const getMovieVideo = await api.get(
      //   `/${movie_id}/videos?api_key=${API_KEY}&language=en-US`
      // );

      dispatch({
        type: "GET_MOVIES_SUCCESS",
        payload: {
          popularMoviesJson: popularMoviesJson,
          topRatedMoviesJson: topRatedMoviesJson,
          upcomingMoviesJson: upcomingMoviesJson,
        },
      });
    } catch (error) {
      dispatch({ type: "GET_MOVIES_FAILURE", payload: { error } });
    }
  };
}

export const movieActions = {
  getMovies,
};
