import React, { Component } from 'react';
import { observer } from "mobx-react";
import { observable } from "mobx";
import { Header, Modal } from 'semantic-ui-react';
import axios from 'axios';
import '../App.css';
import imageNotAvailable from '../../public/images/notavailable.jpg';

@observer
class ModalMovies extends Component {
  @observable movieInfo = "";

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

    return (
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