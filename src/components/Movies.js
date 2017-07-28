import React, { Component } from 'react';
import { observable, action } from "mobx";
import { observer } from "mobx-react";
import axios from 'axios';
import FontAwesome from 'react-fontawesome';
import ModalMovies from './ModalMovies';
import heroImage from '../../public/images/clapperboard.svg';
import MovieListStore from '../stores/movieList';
import '../App.css';

@observer
class Movies extends Component {
  @observable profile = [];
  @observable watched = [];
  @observable isLoading = false;
  @observable isMouseInside = false;
  @observable selectedMovie = [];

  constructor(props) {
    super(props);

    this.movieList = new MovieListStore();
    this.saveWatchedMovies = this.saveWatchedMovies.bind(this);
    this.deleteWatchedMovie = this.deleteWatchedMovie.bind(this);
  }

  componentWillMount() {
    this.profile = JSON.parse(localStorage.getItem('user_profile'));
    this.movieList.getNowPlayingMoviesList();
    this.getWatchedData();
  }

  @action getWatchedData() {
    const { isAuthenticated } = this.props.auth;
    let arrayWatchedList = [];

    if (isAuthenticated()) {

      this.isLoading = true;
      return axios.get('https://movie-giggle-backend.herokuapp.com/api/userwatched/:', {
        params: {
          userID: this.profile.sub
        }
      }).then((response) => {
        if (response.data.length > 0) {
          response.data.map((watchedMovies) => {
            const searchID = watchedMovies.movieID;
            const url = `https://api.themoviedb.org/3/movie/${searchID}?api_key=f1bdbd7920bf91cc1db6cc18fe23f6ab&language=en-US`;
            return axios.get(url).then((response) => {
              response.data.addedOrder = watchedMovies.addedOrder;
              arrayWatchedList.push(response.data);
              this.watched = arrayWatchedList;
            })
          })
          this.isLoading = false;
        } else {
          this.watched = arrayWatchedList;
          this.isLoading = false;
        }
      })
    }
  }

  @action saveWatchedMovies(index, event) {
    const selectedMovie = this.movieList.movies[index].id;

    return axios.post('https://movie-giggle-backend.herokuapp.com/api/userwatched', {
      userID: this.profile.sub,
      movieID: selectedMovie,
      addedOrder: new Date()
    }).then(() => this.getWatchedData())
  }

  @action deleteWatchedMovie(index, event) {
    const selectedMovie = this.movieList.movies[index].id;

    return axios.delete('https://movie-giggle-backend.herokuapp.com/api/userwatched', {
      params: {
        movieID: selectedMovie,
        userID: this.profile.sub
      }
    }).then(() => this.getWatchedData())
  }

  @action mouseIn(movie) {
    this.selectedMovie = movie.id;
    this.isMouseInside = true;
  }

  @action mouseOut() {
    this.selectedMovie = "";
    this.isMouseInside = false;

  }

  render() {

    const { isAuthenticated } = this.props.auth;
    const watchedMovies = this.watched;
    const moviesLoaded = this.movieList.movies;

    const MoviesListed = moviesLoaded.map((movie, index) => (
      <div key={index} className="column is-2">
        <div className="has-text-centered" onMouseEnter={this.mouseIn.bind(this, movie)} onMouseLeave={this.mouseOut.bind(this)}>
          <div className="card-image">
            <img src={"https://image.tmdb.org/t/p/w500/" + movie.poster_path} alt="main" className="card" />
            <span className="moreDetailsBtn">
              {
                (this.isMouseInside) ? (<div>
                  {
                    (moviesLoaded[index].id === this.selectedMovie) ? (<ModalMovies movie={movie} />) : ("")
                  }
                </div>) : ("")
              }
            </span>
            {isAuthenticated()
              ? (
                <div>
                  {(this.isLoading === true)
                    ? (
                      <span className="loadingIcon"><FontAwesome name="fa-spinner" className="fa fa-spinner" size="2x" /></span>
                    )
                    : (
                      <div>
                        {(watchedMovies.some((e) => e.id === movie.id))
                          ? (
                            <a onClick={this.deleteWatchedMovie.bind(this, index)} className="watchedBtn"><FontAwesome name="fa-check-square" className="fa fa-check-square" size="2x" /></a>
                          )
                          : (
                            <a onClick={this.saveWatchedMovies.bind(this, index)} className="addToWatchedBtn"><FontAwesome name="fa-check-square" className="fa fa-check-square " size="2x" /></a>
                          )
                        }
                      </div>
                    )
                  }
                </div>
              )
              : ''
            }
          </div>
        </div>
      </div>
    ));

    return (
      <div>
        <div className="hero is-primary is-bold">
          <div className="hero-body hero-body-bg">
            <div className="container">
              <div className="columns is-vcentered">
                <div className="column"><h1 className="title">{this.movieCategories}</h1></div>
                <div className="column is-narrow"><img className="heroimg" src={heroImage} alt="heroimg" /></div>
              </div>
            </div>
          </div>
          <div className="hero-foot hero-footer-bg">
            <nav className="tabs is-boxed is-fullwidth">
              <div className="container">
                <div className="tabs is-centered">
                  <ul>
                    <li><a onClick={this.movieList.getPopularMoviesList.bind(this)}>Popular Movies</a></li>
                    <li><a onClick={this.movieList.getNowPlayingMoviesList.bind(this)}>Now Playing</a></li>
                    <li><a onClick={this.movieList.getTopRatedMoviesList.bind(this)}>Top Rated</a></li>
                    <li><a onClick={this.movieList.getUpcomingMoviesList.bind(this)}>Upcoming Movies</a></li>
                  </ul>
                </div>
              </div>
            </nav>
          </div>
        </div>
        <div className="section ">
          <div className="container">
            <div className="columns is-multiline">
              {MoviesListed}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Movies;

