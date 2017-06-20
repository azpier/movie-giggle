import React, {Component} from 'react';
import {getMovieData} from '../Utils/movie-api.js';
import '../App.css';
import axios from 'axios';

class PopularMovies extends Component {

  constructor() {
    super()
    this.state = {
      movies: [],
      profile: {}
    };
    this.saveWatchedMovies = this.saveWatchedMovies.bind(this);
  }

  getPopularMovies() {
    getMovieData().then((movies) => {
      this.setState({movies});
    });
  }

  getLoggedUser() {
    this.setState({ profile: {} });
    const { userProfile, getProfile } = this.props.auth;
    if (!userProfile) {
      getProfile((err, profile) => {
        this.setState({ profile });
      });
    } else {
      this.setState({ profile: userProfile });
    }
  }

  saveWatchedMovies(index, event){

    const { profile } = this.state;
    const { movies } = this.state;
    
    const selectedMovie = movies[index].id;

    axios.post('http://localhost:8080/api/userwatched', {
    userID: profile.sub,
    movieID: selectedMovie
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
  }

  componentDidMount() {
    this.getPopularMovies();
    this.getLoggedUser();
  }

  render() {
    const { profile } = this.state;
    const {movies} = this.state;
    const { isAuthenticated } = this.props.auth;

    return (
      <div>
        <div className="uk-container uk-section">
          <h3 className="uk-text-center">Logged User {profile.name}</h3>
          <hr />
          <div className="uk-grid uk-grid-match uk-child-width-1-5@m">
            {movies.map((movie, index) => (
              <div key={index} className="uk-padding">
                <div className="uk-card uk-card-default uk-card-hover uk-text-center">
                  <img src={"https://image.tmdb.org/t/p/w500/" + movie.poster_path} alt="main-images" className="posterImg"/>
                </div>
                <div className="uk-text-center">
                  {
                    isAuthenticated() ? (<div><button onClick={this.saveWatchedMovies.bind(this, index)} className="addToWatchedBtn">Add to Watchlist</button></div>) : ''
                  }
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default PopularMovies;
