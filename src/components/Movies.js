import React, { Component } from 'react';
import { observer } from "mobx-react";
import ModalMovies from './ModalMovies';
import movieListStore from '../stores/movieListStore';
import loadingStore from '../stores/loadingStore';
import watchedMoviesStore from '../stores/watchedMoviesStore';
import Pagination from '../Components/Pagination';
import PageNumber from '../stores/pageStore';
import userProfile from '../stores/userProfileStore';
import '../App.css';

@observer
class Movies extends Component {

  componentWillMount() {
    movieListStore.getPopularMoviesList(PageNumber.page);
    watchedMoviesStore.getWatchedData();
  }

  render() {

    const { isAuthenticated } = this.props.auth;
    const watchedMovies = watchedMoviesStore.watched;
    const moviesLoaded = movieListStore.movies;
    let movieLoading = loadingStore.isLoading;

    const MoviesListed = moviesLoaded.map((movie, index) => (
      <div key={index} className="eight wide mobile three wide computer column">
        <div className="ui link card">
          <div className="image">
            <img src={"https://image.tmdb.org/t/p/w500/" + movie.poster_path} alt="main" />
            <span className="moreDetailsBtn">
              <ModalMovies movie={movie.id} />
            </span>
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
      </div>
    ));

    return (
      <div>
        <div className="category-header">
          <div className="ui container">
            <div className="ui stackable two column middle aligned grid">
              <div className="column">
                <h2>{movieListStore.movieCategories}</h2>
              </div>
              <div className="column right aligned">
                {
                  isAuthenticated() ? (<div><img src={userProfile.profile.picture} alt="profile pic" className="ui avatar image" /> <span className="padded">{userProfile.profile.name}</span></div>) : ("")
                }
              </div>
            </div>
          </div>
        </div>
        <div className="ui container">
          <div className="ui grid">
            <div className="sixteen wide mobile three wide computer column">
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