import api from "../api";

const API_KEY = process.env.REACT_APP_API_KEY;

function getMovies() {
  return async (dispatch) => {
    try {
      dispatch({ type: "GET_MOVIES_REQUEST" });

      const getPopularMovies = api.get(
        `/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
      );

      const getTopRatedMovies = api.get(
        `/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`
      );

      const getUpcomingMovies = api.get(
        `/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`
      );

      const getGenres = api.get(
        `/genre/movie/list?api_key=${API_KEY}&language=en-US`
      );

      const [
        popularMoviesJson,
        topRatedMoviesJson,
        upcomingMoviesJson,
        GenresJson,
      ] = await Promise.all([
        getPopularMovies,
        getTopRatedMovies,
        getUpcomingMovies,
        getGenres,
      ]);

      dispatch({
        type: "GET_MOVIES_SUCCESS",
        payload: {
          popularMoviesJson: popularMoviesJson,
          topRatedMoviesJson: topRatedMoviesJson,
          upcomingMoviesJson: upcomingMoviesJson,
          movieGenresJson: GenresJson,
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
