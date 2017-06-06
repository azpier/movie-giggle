import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Nav from './Nav';
import {getMovieData} from '../utils/movie-api';

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

    return (
      <div>
        <Nav/>
        <h3 className="text-center">Popular Movies</h3>
        <hr/> {Object.keys(movies).map((movie, index) => (
          <div className="col-sm-6" key={index}>
            <div className="panel panel-primary">
              <div className="panel-heading">
                <h3 className="panel-title">
                  <span className="btn">#{movie.results}</span>
                </h3>
              </div>
              <div className="panel-body">
                <p>
                  {movie.overview}
                </p>
              </div>
            </div>
          </div>
        ))}

        <div className="col-sm-12">
          <div className="jumbotron text-center">
            <h2>Get Access to popular movies By Logging In</h2>
          </div>
        </div>

        <div className="col-sm-12">
          <div className="jumbotron text-center">
            <h2>View popular movies</h2>
            <Link className="btn btn-lg btn-success" to='/'>
              Popular movies
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default PopularMovies;
