import React, { Component } from 'react';
import { observable, action } from "mobx";
import { observer } from "mobx-react";
import FontAwesome from 'react-fontawesome';
import ModalMovies from './ModalMovies';
import heroImage from '../../public/images/clapperboard.svg';
import movieListStore from '../stores/movieListStore';
import loadingStore from '../stores/loadingStore';
import watchedMoviesStore from '../stores/watchedMoviesStore';
import '../App.css';

@observer
class Movies extends Component {
  @observable isMouseInside = false;
  @observable selectedMovie = [];

  componentWillMount() {
    movieListStore.getPopularMoviesList();
    watchedMoviesStore.getWatchedData();
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
    const watchedMovies = watchedMoviesStore.watched;
    const moviesLoaded = movieListStore.movies;
    let movieLoading = loadingStore.isLoading;

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
                  {(movieLoading === true) ? (
                    <span className="loadingIcon"><FontAwesome name="fa-spinner" className="fa fa-spinner" size="2x" /></span>
                  )
                    : (
                      <div>
                        {(watchedMovies.some((e) => e.id === movie.id))
                          ? (
                            <a onClick={watchedMoviesStore.deleteWatchedMovie.bind(this, index, this.selectedMovie)} className="watchedBtn"><FontAwesome name="fa-check-square" className="fa fa-check-square" size="2x" /></a>
                          )
                          : (
                            <a onClick={watchedMoviesStore.saveWatchedMovies.bind(this, index, this.selectedMovie)} className="addToWatchedBtn"><FontAwesome name="fa-check-square" className="fa fa-check-square " size="2x" /></a>
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
                    <li><a onClick={movieListStore.getPopularMoviesList.bind(this)}>Popular Movies</a></li>
                    <li><a onClick={movieListStore.getNowPlayingMoviesList.bind(this)}>Now Playing</a></li>
                    <li><a onClick={movieListStore.getTopRatedMoviesList.bind(this)}>Top Rated</a></li>
                    <li><a onClick={movieListStore.getUpcomingMoviesList.bind(this)}>Upcoming Movies</a></li>
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

