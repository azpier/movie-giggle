import React, { Component } from 'react';
import { observer } from "mobx-react";
import { observable, action } from "mobx";
import { getPopularMovies } from '../Utils/movie-api.js';
import '../App.css';
import axios from 'axios';
import FontAwesome from 'react-fontawesome';

@observer class Movies extends Component {
  @observable profile = [];
  @observable movies = [];
  @observable watched = [];
  @observable isLoading = false;
  @observable page = 1;

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

  @action getWatchedData() {
    const { isAuthenticated } = this.props.auth;
    let arrayWatchedList = [];

    if (isAuthenticated()) {

      this.isLoading = true;
      return axios.get('http://localhost:8080/api/userwatched/:', {
        params: {
          userID: this.profile.sub
        }
      }).then((response) => {
        if (response.data.length > 0) {
          response.data.map((watchedMovies) => {
            const searchID = watchedMovies.movieID;
            const url = `https://api.themoviedb.org/3/movie/${searchID}?api_key=f1bdbd7920bf91cc1db6cc18fe23f6ab&language=en-US`;
            //call TMDB api here!!!
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

  componentWillMount() {
    this.getPopularMoviesList();
    this.getWatchedData();
  }

  render() {

    const { isAuthenticated } = this.props.auth;
    const watchedMovies = this.watched;

    return (
      <div>
        <div className="hero">
          {isAuthenticated()
            ? (
              <div className="hero-body">
                <div className="container">
                  <h1 className="title">Welcome {this.profile.name}</h1>
                </div>
              </div>
            )
            : (
              <div className="hero-body">
                <div className="container">
                  <h1 className="title">Please log in to add movies to your lists</h1>
                </div>
              </div>
            )
          }
        </div>
        <div className="section ">
          <div className="container">
            <div className="columns is-multiline">
              {this.movies.map((movie, index) => (
                <div key={index} className="column is-2">
                  <div className="card has-text-centered">
                    <div className="card-image">
                      <img src={"https://image.tmdb.org/t/p/w500/" + movie.poster_path} alt="main" />
                      <ModalMovies clicked={index} movie={movie} />
                    </div>
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
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Movies;

@observer class ModalMovies extends Component {
  @observable status = "modal not-active";
  @observable selectedMovie = "";

  @action toggleClass() {
    var css = (this.status === "modal not-active")
      ? "modal is-active"
      : "modal not-active";
    this.status = css;
  }

  @action getSelectedMovieInfo() {
    const searchID = this.props.movie.id;
    const url = `https://api.themoviedb.org/3/movie/${searchID}?api_key=f1bdbd7920bf91cc1db6cc18fe23f6ab&language=en-US`;
    return axios.get(url)
      .then(response => this.selectedMovie = response.data)
  }

  onButtonClickFunctions() {
    this.toggleClass();
    this.getSelectedMovieInfo();
  }

  render() {
    const movie = this.selectedMovie;
    const classes = this.status;

    return (
      <div>
        <a onClick={this.onButtonClickFunctions.bind(this)}><i className="fa fa-search-plus" aria-hidden="true"></i></a>
        <div className={classes}>
          <div className="modal-background"></div>
          <div className="modal-content box">
            {
              (this.selectedMovie !== "") ? (<div className="columns">
                <div className="column is-one-third">
                  <img className="card" src={"https://image.tmdb.org/t/p/w500/" + movie.poster_path} alt="main" />
                </div>
                <div className="column content has-text-left">
                  <h1>{movie.title}</h1>
                  <p>{movie.overview}</p>
                  <p>Minutes: {movie.runtime}</p>
                  <p>Year: ({movie.release_date.slice(0, 4)})</p>
                  <p>Rating: <i className="fa fa-star starRatingIcon"></i>  {movie.vote_average}</p>
                  <p>Vote count: {movie.vote_count}</p>
                </div>
              </div>) : (<div></div>)
            }
          </div>
          <a onClick={this.onButtonClickFunctions.bind(this)} className="modal-close is-large"></a>
        </div>
      </div>
    );
  }
}
