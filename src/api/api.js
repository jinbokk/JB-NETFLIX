import axios from "axios";

const API = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: { "Content-Type": "application/json" },
});

const getMovies = async () => {
  const getPopularMovies = await API.get(
    `/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
  );
  return console.log(getPopularMovies);
};

getMovies();

export default API;
