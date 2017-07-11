import React, { Component } from 'react';
import { observer } from "mobx-react";
import { observable, action } from "mobx";
import { getPopularMovies, getNowPlayingMovies, getTopRatedMovies, getUpcomingMovies } from '../Utils/movie-api.js';
import '../App.css';
import axios from 'axios';
import FontAwesome from 'react-fontawesome';
import ModalMovies from './ModalMovies';
import MovieFilter from './MovieFilter';

@observer class Movies extends Component {
  @observable profile = [];
  @observable movies = [];
  @observable watched = [];
  @observable isLoading = false;
  @observable page = 1;
  @observable isMouseInside = false;
  @observable selectedMovie = [];

  constructor(props) {
    super(props);

    let userProfile = localStorage.getItem('user_profile');
    userProfile = JSON.parse(userProfile);

    this.profile = userProfile;
    this.saveWatchedMovies = this.saveWatchedMovies.bind(this);
    this.deleteWatchedMovie = this.deleteWatchedMovie.bind(this)
  }

  @action getPopularMoviesList() {
    getPopularMovies(this.page).then((movies) => {
      this.movies = movies;
    });
  }

  @action getNowPlayingMoviesList() {
    getNowPlayingMovies(this.page).then((movies) => {
      this.movies = movies;
    });
  }

  @action getTopRatedMoviesList() {
    getTopRatedMovies(this.page).then((movies) => {
      this.movies = movies;
    });
  }

  @action getUpcomingMoviesList() {
    getUpcomingMovies(this.page).then((movies) => {
      this.movies = movies;
    });
  }


  @action getWatchedData() {
    const { isAuthenticated } = this.props.auth;
    let arrayWatchedList = [];

    if (isAuthenticated()) {

      this.isLoading = true;
      //Get user selections in db
      return axios.get('http://localhost:8080/api/userwatched/:', {
        params: {
          userID: this.profile.sub
        }
      }).then((response) => {
        if (response.data.length > 0) {
          response.data.map((watchedMovies) => {
            const searchID = watchedMovies.movieID;
            const url = `https://api.themoviedb.org/3/movie/${searchID}?api_key=f1bdbd7920bf91cc1db6cc18fe23f6ab&language=en-US`;
            //call TMDB api and get all user selected movies
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
    const selectedMovie = this.movies[index].id;

    return axios.post('http://localhost:8080/api/userwatched', {
      userID: this.profile.sub,
      movieID: selectedMovie,
      addedOrder: new Date()
    }).then(() => this.getWatchedData())
  }

  @action deleteWatchedMovie(index, event) {
    const selectedMovie = this.movies[index].id;

    return axios.delete('http://localhost:8080/api/userwatched', {
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

  componentWillMount() {
    this.getPopularMoviesList();
    this.getWatchedData();
  }

  render() {

    const { isAuthenticated } = this.props.auth;
    const watchedMovies = this.watched;

    return (
      <div>
      <MovieFilter popular={this.getPopularMoviesList.bind(this)} nowPlaying={this.getNowPlayingMoviesList.bind(this)} topRated={this.getTopRatedMoviesList.bind(this)} upcoming={this.getUpcomingMoviesList.bind(this)}/>
        <div className="section ">
          <div className="container">
            <div className="columns is-multiline">
              {this.movies.map((movie, index) => (
                <div key={index} className="column is-2">
                  <div className="has-text-centered" onMouseEnter={this.mouseIn.bind(this, movie)} onMouseLeave={this.mouseOut.bind(this)}>
                    <div className="card-image">
                      <img src={"https://image.tmdb.org/t/p/w500/" + movie.poster_path} alt="main" className="card"/>
                      <span className="moreDetailsBtn">
                        {
                          (this.isMouseInside) ? (<div>
                            {
                              (this.movies[index].id === this.selectedMovie) ? (<ModalMovies movie={movie} />) : ("")
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
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Movies;

