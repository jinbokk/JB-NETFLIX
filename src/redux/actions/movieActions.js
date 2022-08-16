import api from "../api";

const API_KEY = process.env.REACT_APP_API_KEY;

function getMovies(pageNum) {
  return async (dispatch) => {
    try {
      dispatch({ type: "GET_MOVIES_REQUEST" });

      const getPopularMovies = api.get(
        `/movie/popular?api_key=${API_KEY}&language=en-US&page=${pageNum}`
      );

      const getTopRatedMovies = api.get(
        `/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${pageNum}`
      );

      const getUpcomingMovies = api.get(
        `/movie/upcoming?api_key=${API_KEY}&language=en-US&page=${pageNum}`
      );

      const getGenres = api.get(
        `/genre/movie/list?api_key=${API_KEY}&language=en-US`
      );

      const getNowPlayingMovies = api.get(
        `/movie/now_playing?api_key=${API_KEY}&language=en-US&page=${pageNum}`
      );

      const [
        popularMoviesJson,
        topRatedMoviesJson,
        upcomingMoviesJson,
        GenresJson,
        NowPlayingMoviesJson,
      ] = await Promise.all([
        getPopularMovies,
        getTopRatedMovies,
        getUpcomingMovies,
        getGenres,
        getNowPlayingMovies,
      ]);

      dispatch({
        type: "GET_MOVIES_SUCCESS",
        payload: {
          popularMoviesJson: popularMoviesJson,
          topRatedMoviesJson: topRatedMoviesJson,
          upcomingMoviesJson: upcomingMoviesJson,
          movieGenresJson: GenresJson,
          NowPlayingMoviesJson: NowPlayingMoviesJson,
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
