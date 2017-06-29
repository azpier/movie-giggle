import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3/';

export function getPopularMovies(page) {
  const url = `${BASE_URL}movie/popular?api_key=f1bdbd7920bf91cc1db6cc18fe23f6ab&language=en-US&page=${page}`;
  return axios.get(url)
  .then(response => response.data.results);
}

export function getLatestMovies(){
  const url = `${BASE_URL}movie/latest?api_key=f1bdbd7920bf91cc1db6cc18fe23f6ab&language=en-US`;
  return axios.get(url)
  .then(response => response.data.results);
}

export function getNowPlayingMovies(page){
  const url = `${BASE_URL}movie/now_playing?api_key=f1bdbd7920bf91cc1db6cc18fe23f6ab&language=en-US&page=${page}`;
  return axios.get(url)
  .then(response => response.data.results);
}

export function getTopRatedMovies(page){
  const url = `${BASE_URL}movie/top_rated?api_key=f1bdbd7920bf91cc1db6cc18fe23f6ab&language=en-US&page=${page}`;
  return axios.get(url)
  .then(response => response.data.results);
}

export function getUpcomingMovies(page){
  const url = `${BASE_URL}movie/upcoming?api_key=f1bdbd7920bf91cc1db6cc18fe23f6ab&language=en-US&page=${page}`;
  return axios.get(url)
  .then(response => response.data.results);
}