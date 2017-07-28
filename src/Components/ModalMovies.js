import React, { Component } from 'react';
import { observer } from "mobx-react";
import { observable, action } from "mobx";
import '../App.css';
import axios from 'axios';
import FontAwesome from 'react-fontawesome';


@observer class ModalMovies extends Component {
  @observable status = "modal not-active";
  @observable selectedMovie = "";

  @action toggleClass() {
    var css = (this.status === "modal not-active")
      ? "modal is-active"
      : "modal not-active";
    this.status = css;
  }

  @action getSelectedMovieInfo() {
    const searchID = this.props.movie.id;
    const url = `https://api.themoviedb.org/3/movie/${searchID}?api_key=f1bdbd7920bf91cc1db6cc18fe23f6ab&language=en-US`;
    return axios.get(url)
      .then(response => this.selectedMovie = response.data)
  }

  onButtonClickFunctions() {
    this.toggleClass();
    this.getSelectedMovieInfo();
  }

  render() {
    const movie = this.selectedMovie;
    const classes = this.status;

    return (
      <div>
        <a onClick={this.onButtonClickFunctions.bind(this)}><i className="fa fa-search-plus" aria-hidden="true"></i></a>
        <div className={classes}>
          <div className="modal-background"></div>
          <div className="modal-content box">
            {
              (this.selectedMovie !== "") ? (<div className="columns">
                <div className="column is-one-third">
                  <img className="card" src={"https://image.tmdb.org/t/p/w500/" + movie.poster_path} alt="main" />
                </div>
                <div className="column content has-text-left">
                  <h1>{movie.title}</h1>
                  <p>{movie.overview}</p>
                  <p>Minutes: {movie.runtime}</p>
                  <p>Year: ({movie.release_date.slice(0, 4)})</p>
                  <p>Rating: {movie.vote_average} <FontAwesome name="fa-star" className="fa fa-star star-icon" /></p>
                  <p>Vote count: {movie.vote_count}</p>
                </div>
              </div>) : (<div></div>)
            }
          </div>
          <a onClick={this.onButtonClickFunctions.bind(this)} className="modal-close is-large"></a>
        </div>
      </div>
    );
  }
}
export default ModalMovies;