import React, { Component } from 'react';
import { observer } from "mobx-react";
import ModalMovies from './ModalMovies';
import watchedMoviesStore from '../stores/watchedMoviesStore';
import '../App.css';
import userProfile from '../stores/userProfileStore';
import SearchModule from '../Components/Search';

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
        <div className="ui container alert-text">
        <div className="ui grid">
          <div className="sixteen wide center aligned mobile three wide computer column">
            <div className="search-module-style"><SearchModule /></div>
          </div>
          <div className="sixteen wide mobile thirteen wide computer center aligned column">
            <div className="ui compact red message">
              <div className="header">
                Your list is empty
        </div>
              go add some movies to your watched movies list
        </div>
          </div>
        </div>
        </div>
      )
    } else {
      return (
        <div>
          <div className="category-header">
            <div className="ui container">
              <div className="ui middle aligned grid">
                <div className="ui eleven wide column">
                  <h2 className="header-category-text">Watched Movies</h2>
                </div>
                <div className="ui five wide column">
                  {
                    isAuthenticated() ? (<div><img src={userProfile.profile.picture} alt="profile pic" className="ui avatar image" /> <span className="profile-name">{userProfile.profile.name}</span></div>) : ("")
                  }
                </div>
              </div>
            </div>
          </div>
          <div className="ui container">
            <div className="ui grid">
              <div className="sixteen wide center aligned mobile three wide computer column">
                <div className="search-module-style"><SearchModule /></div>
              </div>
              <div className="sixteen wide mobile thirteen wide computer center aligned column">
                <div className="ui segment padded grid">
                  {userWatched.map((movie, index) => (
                    <div key={index} className="sixteen wide mobile three wide computer column">
                      <div className="ui image">
                        <ModalMovies movie={movie.id} image={<img src={"https://image.tmdb.org/t/p/w500/" + movie.poster_path} alt="main" className="ui card" />} />
                        <a onClick={watchedMoviesStore.deleteWatchedMovie.bind(this, index, movie.id)} className="watchedremoveBtn"><i className="large minus square icon"></i></a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default WatchedMovies;

