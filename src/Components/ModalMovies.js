import React, { Component } from 'react';
import { observer } from "mobx-react";
import { observable } from "mobx";
import { Header, Modal } from 'semantic-ui-react';
import axios from 'axios';
import '../App.css';
import imageNotAvailable from '../../public/images/notavailable.jpg';
import watchedMoviesStore from '../stores/watchedMoviesStore';
import Auth from '../Auth/Auth';

const auth = new Auth();

//this is the component that shows when you click a movie.
@observer
class ModalMovies extends Component {
  @observable movieInfo = "";

//gets the clicked movie id and makes the query for the movie info
  getSelectedMovieInfo() {
    const searchID = this.props.movie;
    const url = `https://api.themoviedb.org/3/movie/${searchID}?api_key=f1bdbd7920bf91cc1db6cc18fe23f6ab&language=en-US`;
    return axios.get(url)
      .then(response => this.movieInfo = response.data)
  }

  onButtonClickFunctions() {
    this.getSelectedMovieInfo();
  }

  render() {
    const movie = this.movieInfo;
    const watchedMovies = watchedMoviesStore.watched;
    const isAuthenticated = auth.isAuthenticated;

    return (
      //those are the props that the component needs to work
      <Modal trigger={<a onClick={this.onButtonClickFunctions.bind(this)}>{this.props.image}</a>} open={this.props.open} onClose={this.props.onClose} onMount={this.onButtonClickFunctions.bind(this)} closeIcon>
        <Modal.Content>
          <div className="ui grid">
            <div className="four wide column">
              {
                (movie.poster_path === null) ? (
                  <img className="ui card" src={imageNotAvailable} alt="notavailable" />
                ) : (
                    <img className="ui card" src={"https://image.tmdb.org/t/p/w500/" + movie.poster_path} alt="main" />
                  )
              }
            </div>
            <div className="twelve wide column">
              <Header>{movie.title}</Header>
              {
                (movie === "") ? ("") : (
                  <span>
                    <p>{movie.overview}</p>
                    <p>Minutes: {movie.runtime}</p>
                    <p>Year: ({movie.release_date.slice(0, 4)})</p>
                    <p>Rating: <i className="star icon"></i>{movie.vote_average}</p>
                    <p>Vote count: {movie.vote_count}</p>
                    {isAuthenticated() ? (<div>
                      {(watchedMovies.some((e) => e.id === movie.id))
                        ? (
                          <a onClick={watchedMoviesStore.deleteWatchedMovie.bind(0, this, movie.id)}><i className="large minus square icon"></i> Remove from watched list</a>
                        )
                        : (
                          <a onClick={watchedMoviesStore.saveWatchedMovies.bind(0, this, movie.id)}><i className="large add square icon"></i> Add to watched list</a>
                        )
                      }
                    </div>) : ("") }
                    
                  </span>
                )
              }
            </div>
          </div>
        </Modal.Content>
      </Modal>
    );
  }
}

export default ModalMovies;