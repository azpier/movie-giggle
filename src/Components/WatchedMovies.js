import React, { Component } from 'react';
import { observer } from "mobx-react";
import ModalMovies from './ModalMovies';
import watchedMoviesStore from '../stores/watchedMoviesStore';
import '../App.css';
import userProfile from '../stores/userProfileStore';

@observer
class WatchedMovies extends Component {

  componentWillMount() {
    watchedMoviesStore.getWatchedData();
  }

  render() {
    const userWatched = watchedMoviesStore.watched;
    const { isAuthenticated } = this.props.auth;

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
          <div className="category-header">
            <div className="ui container">
              <div className="ui stackable two column middle aligned grid">
                <div className="column">
                  <h2>Watched Movies</h2>
                </div>
                <div className="column right aligned">
                  {
                    isAuthenticated() ? (<div><img src={userProfile.profile.picture} alt="profile pic" className="ui avatar image" /> <span className="padded">{userProfile.profile.name}</span></div>) : ("")
                  }
                </div>
              </div>
            </div>
          </div>
          <div className="ui stackable two column middle aligned grid center aligned container">
            {userWatched.map((movie, index) => (
              <div key={index} className="three wide column">
                <div className="ui image">
                  <ModalMovies movie={movie.id} image={<img src={"https://image.tmdb.org/t/p/w500/" + movie.poster_path} alt="main" className="ui card" />} />
                    <a onClick={watchedMoviesStore.deleteWatchedMovie.bind(this, index, movie.id)} className="watchedremoveBtn"><i className="large minus square icon"></i></a>
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

