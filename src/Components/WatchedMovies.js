import React, { Component } from 'react';
import axios from 'axios';

class WatchedMovies extends Component {

  constructor() {
    super()
    this.state = {
      movies: [],
      profile: {}
    };
  }

  getWatchedData() {
    const { profile } = this.state
    return axios.get('http://localhost:8080/api/userwatched', {
      params: {
        userid: profile.sub
      }
    }).then(response => response.data)
    .then((movies) => {
      this.setState({movies});
    });
  }

  getWatchedMovies() {
    
    return axios.get('http://localhost:8080/api/userwatched')
    .then((movies) => {
      this.setState({movies});
    });
  }


  getLoggedUser() {
    this.setState({ profile: {} });
    const { userProfile, getProfile } = this.props.auth;
    if (!userProfile) {
      getProfile((err, profile) => {
        this.setState({ profile });
        this.getWatchedData();
      });
    } else {
      this.setState({ profile: userProfile });
      this.getWatchedData();
    }
  }

  componentWillMount() {
    this.getLoggedUser();
  }

  render() {

    const { movies } = this.state;
    const { isAuthenticated } = this.props.auth;

    return (
      <div>
        <div className="uk-container uk-section">
          <h3 className="uk-text-center">Popular Movies</h3>
          <hr />
          <div className="uk-grid uk-grid-match uk-child-width-1-5@m">
            {movies.map((movie, index) => (
              <div key={index} className="uk-padding">
                <div className="uk-card uk-card-default uk-card-hover uk-text-center">
                  <img src={"https://image.tmdb.org/t/p/w500/" + movie.poster_path} alt="main-images" />
                </div>
                <div className="uk-text-center">
                  {
                    isAuthenticated() ? (<div><button className="removeFromWatchedBtn">Remove</button></div>) : ''
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

export default WatchedMovies;
