import api from "../api";

const API_KEY = process.env.REACT_APP_API_KEY;

let initialState = {
  getPopularMovies: {},
};

function getMovies(state = initialState, action) {
  return async (dispatch) => {
    const getPopularMovies = await api.get(
      `/popular?api_key=${API_KEY}&language=en-US&page=1`
    );
  };
}

export const movieActions = {
  getMovies,
};
