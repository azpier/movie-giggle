import React, { Component } from 'react';
import { observer } from "mobx-react";
import ModalMovies from './ModalMovies';
import watchedMoviesStore from '../stores/watchedMoviesStore';
import '../App.css';

@observer
class WatchedMovies extends Component {

  componentWillMount() {
    watchedMoviesStore.getWatchedData();
  }

  render() {
    const userWatched = watchedMoviesStore.watched;

    if (userWatched !== "") {
      userWatched.sort(function (a, b) {
        return new Date(a.addedOrder) - new Date(b.addedOrder);
      });
    }

    if (userWatched.length === 0) {
      return (
        <div>The list is empty</div>
      )
    } else {
      return (
        <div>
          <div className="ui stackable two column very relaxed grid container">
              {userWatched.map((movie, index) => (
                <div key={index} className="four wide column">
                  <div className="ui card">
                    <div className="image">
                      <img src={"https://image.tmdb.org/t/p/w500/" + movie.poster_path} alt="main" />
                    </div>
                    <div className="watched-movies-info center aligned">
                    <span>{movie.release_date.slice(0, 4)}</span>
                    <span><i className="star icon"></i>{movie.vote_average}</span>
                    <span><ModalMovies movie={movie.id} /></span>
                      <a onClick={watchedMoviesStore.deleteWatchedMovie.bind(this, index, movie.id)} className="watchedremoveBtn"><i className="large minus square icon"></i></a>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      );
    }
  }
}

export default WatchedMovies;

