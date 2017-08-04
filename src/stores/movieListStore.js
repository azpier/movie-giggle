import { observable, action } from "mobx";
import { getPopularMovies, getNowPlayingMovies, getTopRatedMovies, getUpcomingMovies } from '../Utils/movie-api.js';
import PageNumber from '../stores/pageStore';

class MovieListStore {
    @observable movies = [];
    @observable movieCategories = "";

    @action getPopularMoviesList = () => {
        this.movieCategories = "Popular Movies";
        this.movies = [];
        getPopularMovies(PageNumber.page).then((movie) => {
            this.movies = movie;
        });
    }

    @action getNowPlayingMoviesList = () => {
        this.movieCategories = "Now Playing Movies";
        this.movies = [];
        getNowPlayingMovies(PageNumber.page).then((movies) => {
            this.movies = movies;
        });
    }

    @action getTopRatedMoviesList = () => {
        this.movieCategories = "Top Rated Movies";
        this.movies = [];
        getTopRatedMovies(PageNumber.page).then((movies) => {
            this.movies = movies;
        });
    }

    @action getUpcomingMoviesList = () => {
        this.movieCategories = "Upcoming Movies";
        this.movies = [];
        getUpcomingMovies(PageNumber.page).then((movies) => {
            this.movies = movies;
        });
    }

}

const movieListStore = new MovieListStore();
export default movieListStore;