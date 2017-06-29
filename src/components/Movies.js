import React, { Component } from 'react';
import { getPopularMovies, getLatestMovies, getNowPlayingMovies, getTopRatedMovies, getUpcomingMovies } from '../Utils/movie-api.js';
import '../App.css';
import axios from 'axios';
import FontAwesome from 'react-fontawesome';

class PopularMovies extends Component {

  constructor(props) {
    super(props)
    this.state = {
      movies: [],
      watched: [],
      page: 1
    };
    this.saveWatchedMovies = this.saveWatchedMovies.bind(this);
  }

  getPopularMoviesList() {
    getPopularMovies(this.state.page).then((movies) => {
      this.setState({ movies });
    });
  }

   getLatestMoviesList() {
    getLatestMovies().then((movies) => {
      this.setState({ movies });
    });
  }

   getNowPlayingMoviesList() {
    getNowPlayingMovies(this.state.page).then((movies) => {
      this.setState({ movies });
    });
  }

   getTopRatedMoviesList() {
    getTopRatedMovies(this.state.page).then((movies) => {
      this.setState({ movies });
    });
  }

   getUpcomingMoviesList() {
    getUpcomingMovies(this.state.page).then((movies) => {
      this.setState({ movies });
    });
  }

  getWatchedData() {
    const { isAuthenticated } = this.props.auth;
    let arrayWatchedList = [];

    if (isAuthenticated()) {
      let userProfile = localStorage.getItem('user_profile');
      userProfile = JSON.parse(userProfile);
      return axios.get('http://localhost:8080/api/userwatched/:', {
        params: {
          userID: userProfile.sub
        }
      })
        .then((response) => {
          response.data.map((watchedMovies) => {
            const searchID = watchedMovies.movieID;
            const url = `https://api.themoviedb.org/3/movie/${searchID}?api_key=f1bdbd7920bf91cc1db6cc18fe23f6ab&language=en-US`;
            //call tmdb api here!!!
            return axios.get(url)
              .then((response) => {
                response.data.addedOrder = watchedMovies.addedOrder;
                arrayWatchedList.push(response.data);
                this.setState({ watched: arrayWatchedList });
              })
          });
        })
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
      .then((response) => {
        this.getWatchedData();
        console.log(response);
      })
  }

  componentDidMount() {
    this.getPopularMoviesList();
    this.getWatchedData();
  }

  render() {
    const { movies } = this.state;
    const { watched } = this.state;
    const { isAuthenticated } = this.props.auth;

    return (
      <div>
        <div className="uk-container uk-padding">
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
                  {
                    isAuthenticated() ? (
                      <div>
                        {
                          (watched.some((e) => e.id === movie.id)) ? (<a className="watchedBtn"><FontAwesome name="fa-check-square" className="fa fa-check-square " size="2x"/></a>) : (<a onClick={this.saveWatchedMovies.bind(this, index)} className="addToWatchedBtn"><FontAwesome name="fa-check-square" className="fa fa-check-square " size="2x"/></a>)
                        }
                      </div>
                    ) : ''
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
