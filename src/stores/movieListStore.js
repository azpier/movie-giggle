import { observable, action } from "mobx";
import { getPopularMovies, getNowPlayingMovies, getTopRatedMovies, getUpcomingMovies } from '../Utils/movie-api.js';

class MovieListStore {
    @observable movies = [];
    @observable page = 1;
    @observable movieCategories = "";

    @action getPopularMoviesList = () => {
        this.movies = [];
        getPopularMovies(this.page).then((movie) => {
            this.movies = movie;
        });
    }

    @action getNowPlayingMoviesList = () => {
        this.movieCategories = "Now Playing Movies";
        this.movies = [];
        getNowPlayingMovies(this.page).then((movies) => {
            this.movies = movies;
        });
    }

    @action getTopRatedMoviesList = () => {
        this.movieCategories = "Top Rated Movies";
        this.movies = [];
        getTopRatedMovies(this.page).then((movies) => {
            this.movies = movies;
        });
    }

    @action getUpcomingMoviesList = () => {
        this.movieCategories = "Upcoming Movies";
        this.movies = [];
        getUpcomingMovies(this.page).then((movies) => {
            this.movies = movies;
        });
    }

}

const movieListStore = new MovieListStore();
export default movieListStore;