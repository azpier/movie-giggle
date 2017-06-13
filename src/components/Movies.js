import React, {Component} from 'react';
import {getMovieData} from '../Utils/movie-api.js';

class PopularMovies extends Component {

  constructor() {
    super()
    this.state = {
      movies: []
    };
  }

  getPopularMovies() {
    getMovieData().then((movies) => {
      this.setState({movies});
    });
  }

  componentDidMount() {
    this.getPopularMovies();
  }

  render() {

    const {movies} = this.state;
    const { isAuthenticated } = this.props.auth;

    return (
      <div>
        <div className="uk-container uk-section">
          <h3 className="uk-text-center">Popular Movies</h3>
            <hr/>
            <div className="uk-grid uk-grid-match uk-child-width-1-5@m">
              {movies.map((movie, index) => (
                <div key={index} className="uk-padding">
                  <div className="uk-card uk-card-default uk-card-hover uk-text-center">
                      <img src={"https://image.tmdb.org/t/p/w500/" + movie.poster_path} alt="main-images"/>
                      {
                        isAuthenticated() ? (<div><button className="addToWatchedBtn">Add to Watchlist</button></div>) : ''                   
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
