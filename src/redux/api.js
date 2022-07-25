import axios from "axios";

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/movie',
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use(
  function (config) {
    console.log("request is", config);
    return config;
  },
  function (error) {
    console.log("request error is", error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  function (response) {
    console.log("response is", response);
    return response;
  },
  function (error) {
    console.log("response error is", error.message);
    return Promise.reject(error);
  }
);

export default api;
