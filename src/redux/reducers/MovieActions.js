import API from "../api";

let initialState = {};

function MovieActions(state = initialState, action) {
  const API_KEY = process.env.REACT_APP_API_KEY;

  const getPopularMovies = async () => {
    const getPopularMovies = await API.get(
      `/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
    );
  };
}

export default MovieActions;
