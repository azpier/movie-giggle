import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3/';

function getMovieData() {
  const url = `${BASE_URL}movie/popular?api_key=f1bdbd7920bf91cc1db6cc18fe23f6ab&language=en-US&page=1`;
  return axios.get(url)
  .then(response => response.data.results);
}

export {getMovieData};
