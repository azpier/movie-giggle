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

    const userID = profile.sub;

    return axios.get('http://localhost:8080/api/userwatched', {
      params: {
        userID: userID
      }
    }).then(response => response.data)
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
                  <h2>{movie.movieID}</h2>
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
