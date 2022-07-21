const axios = require('axios').default;

const getMovies = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {'content-type': 'application/json'}
});

axios.get() {

}