import api from "../api";

const API_KEY = process.env.REACT_APP_API_KEY;

function getMovies() {
  return async (dispatch) => {
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

    dispatch({
      type: "GET_MOVIES_SUCCESS",
      payload: {
        popularMoviesJson: popularMoviesJson,
        topRatedMoviesJson: topRatedMoviesJson,
        upcomingMoviesJson: upcomingMoviesJson,
      },
    });
  };
}

export const movieActions = {
  getMovies,
};
