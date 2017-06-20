import React, { Component } from 'react';
import axios from 'axios';

class WatchedMovies extends Component {

  constructor() {
    super()
    this.state = {
      watched: [],
      profile: {}
    };
    this.deleteWatchedMovie = this.deleteWatchedMovie.bind(this);
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

  getWatchedData() {
    
    const { profile } = this.state;

    const userID = profile.sub;

    return axios.get('http://localhost:8080/api/userwatched/:', {
      params: {
        userID: userID
      }
    })
    .then(response => response.data)
    .then((watched) => {
      this.setState({watched});
    });
  }

  deleteWatchedMovie(index, event){

    const { watched } = this.state;
    const selectedMovie = watched[index].movieID;

    axios.delete('http://localhost:8080/api/userwatched/:', {
    movieID: selectedMovie
  })
  .then(response =>{this.getWatchedData()})
  .catch(function (error) {
    console.log(error);
  });

}

  componentWillMount() {
    this.getLoggedUser()
  }

  componentDidMount(){
    this.getLoggedUser()
  }


  render() {
    const { watched } = this.state;
    const { profile } = this.state

    return (
      <div>
        <div className="uk-container uk-section">
          <h3 className="uk-text-center">Logged User {profile.name}</h3>
          <hr />
          <div className="uk-grid uk-grid-match uk-child-width-1-5@m">
            {watched.map((movie, index) => (
              <div key={index} className="uk-padding">
                <div className="uk-card uk-card-default uk-card-hover uk-text-center">
                  <h2>{movie.movieID}</h2>
                </div>
                <div className="uk-text-center">
                 <button onClick={this.deleteWatchedMovie.bind(this, index)}className="removeFromWatchedBtn">Remove</button>
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
