import React, { Component } from 'react';
import { getMovieData } from '../Utils/movie-api.js';
import '../App.css';
import axios from 'axios';

class PopularMovies extends Component {

  constructor(props) {
    super(props)
    this.state = {
      movies: [],
      watched: []
    };
    this.saveWatchedMovies = this.saveWatchedMovies.bind(this);

  }

  getPopularMovies() {
    getMovieData().then((movies) => {
      this.setState({ movies });
    });
  }

  getWatchedData() {

    const { isAuthenticated } = this.props.auth;

    if (isAuthenticated()) {

      let userProfile = localStorage.getItem('user_profile');
      userProfile = JSON.parse(userProfile);

      if (userProfile != null) {
        return axios.get('http://localhost:8080/api/userwatched/:', {
          params: {
            userID: userProfile.sub
          }
        })
          .then(response => this.setState({ watched: response.data }))
      }
    }
  }


  saveWatchedMovies(index, event) {

    let userProfile = localStorage.getItem('user_profile');
    userProfile = JSON.parse(userProfile);

    const { movies } = this.state;

    const selectedMovie = movies[index].id;

    axios.post('http://localhost:8080/api/userwatched', {
      userID: userProfile.sub,
      movieID: selectedMovie,
      addedOrder: new Date()
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
    this.getWatchedData();
  }

  render() {

    const { movies } = this.state;
    const { isAuthenticated } = this.props.auth;

    return (
      <div>
        <div className="uk-container uk-section">
          <div>
            {
              isAuthenticated() ? (<h3 className="uk-text-center">Welcome</h3>) : (<h3 className="uk-text-center">Please login to add movies to your list</h3>)
            }
          </div>
          <hr />
          <div className="uk-grid uk-grid-match uk-child-width-1-5@m">
            {movies.map((movie, index) => (
              <div key={index} className="uk-padding">
                <div className="uk-card uk-card-default uk-card-hover uk-text-center">
                  <img src={"https://image.tmdb.org/t/p/w500/" + movie.poster_path} alt="main-images" className="posterImg" />
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
