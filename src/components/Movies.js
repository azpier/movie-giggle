import React, { Component } from 'react';
import { observer } from "mobx-react";
import ModalMovies from './ModalMovies';
import movieListStore from '../stores/movieListStore';
import loadingStore from '../stores/loadingStore';
import watchedMoviesStore from '../stores/watchedMoviesStore';
import Pagination from '../Components/Pagination';
import PageNumber from '../stores/pageStore';
import userProfile from '../stores/userProfileStore';
import SearchModule from '../Components/Search';
import '../App.css';
import imageNotAvailable from '../../public/images/notavailable.jpg';

@observer
class Movies extends Component {

  componentWillMount() {
    movieListStore.getPopularMoviesList(PageNumber.page);
    watchedMoviesStore.getWatchedData();
    this.getUserProfile();
  }

  getUserProfile() {
    const { getProfile, isAuthenticated } = this.props.auth;

    if (isAuthenticated()) {
      if (userProfile.profile === null) {
        getProfile();
      }
    }
  }
  render() {

    const { isAuthenticated } = this.props.auth;
    const watchedMovies = watchedMoviesStore.watched;
    const moviesLoaded = movieListStore.movies;
    let movieLoading = loadingStore.isLoading;

    const MoviesListed = moviesLoaded.map((movie, index) => (
      <div key={index} className="eight wide mobile three wide computer column">
        <div className="ui image">
          {
            (movie.poster_path === null) ? (
              <ModalMovies movie={movie.id} image={
                <img src={imageNotAvailable} alt="notavailable" className="ui card" />
              } />
            ) : (
                <ModalMovies movie={movie.id} image={<img src={"https://image.tmdb.org/t/p/w500/" + movie.poster_path} alt="main" className="ui card" />} />
              )
          }
          {isAuthenticated()
            ? (
              <div>
                {(movieLoading === true) ? (
                  <span className="loadingIcon"><i className="large spinner icon"></i></span>
                )
                  : (
                    <div>
                      {(watchedMovies.some((e) => e.id === movie.id))
                        ? (
                          <a onClick={watchedMoviesStore.deleteWatchedMovie.bind(this, index, movie.id)} className="watchedBtn"><i className="large add square icon"></i></a>
                        )
                        : (
                          <a onClick={watchedMoviesStore.saveWatchedMovies.bind(this, index, movie.id)} className="addToWatchedBtn"><i className="large add square icon"></i></a>
                        )
                      }
                    </div>
                  )
                }
              </div>
            )
            : ''
          }
        </div>
      </div>
    ));

    return (
      <div>
        <div className="category-header">
          <div className="ui container">
            <div className="ui middle aligned grid">
              <div className="ui eleven wide column">
                <h2 className="header-category-text">{movieListStore.movieCategories}</h2>
              </div>
              <div className="ui five wide column">
                {
                  (isAuthenticated() && userProfile.profile !== null) ? (<div><img src={userProfile.profile.picture} alt="profile pic" className="ui avatar image" /> <span className="profile-name">{userProfile.profile.name}</span></div>) : ("")
                }
              </div>
            </div>
          </div>
        </div>
        <div className="ui container">
          <div className="ui grid">
            <div className="sixteen wide center aligned mobile three wide computer column">
              <div className="search-module-style"><SearchModule /></div>
              <div className="ui fluid vertical menu">
                <a className="item" onClick={movieListStore.getPopularMoviesList.bind(this)}>Popular Movies</a>
                <a className="item" onClick={movieListStore.getNowPlayingMoviesList.bind(this)}>Now Playing</a>
                <a className="item" onClick={movieListStore.getTopRatedMoviesList.bind(this)}>Top Rated</a>
                <a className="item" onClick={movieListStore.getUpcomingMoviesList.bind(this)}>Upcoming Movies</a>
              </div>
            </div>
            <div className="sixteen wide mobile thirteen wide computer center aligned column">
              <div className="ui middle aligned segment">
                <Pagination />
              </div>
              <div className="ui segment padded center aligned grid">
                {MoviesListed}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Movies;