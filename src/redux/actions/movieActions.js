import api from "../api";

function getMovies() {
  const API_KEY = process.env.REACT_APP_API_KEY;
  return async (dispatch) => {
    try {
      dispatch({ type: "GET_MOVIES_REQUEST" });

      const getPopularMovies = api.get(
        `/movie/popular?api_key=${API_KEY}&language=en-US&page=1&region=US`
      );

      const getTopRatedMovies = api.get(
        `/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1&region=US`
      );

      const getUpcomingMovies = api.get(
        `/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1&region=US`
      );

      const getGenres = api.get(
        `/genre/movie/list?api_key=${API_KEY}&language=en-US&region=US`
      );

      const getNowPlayingMovies = api.get(
        `/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=US`
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
