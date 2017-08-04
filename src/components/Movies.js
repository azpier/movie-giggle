import React, { Component } from 'react';
import { observer } from "mobx-react";
import ModalMovies from './ModalMovies';
import movieListStore from '../stores/movieListStore';
import loadingStore from '../stores/loadingStore';
import watchedMoviesStore from '../stores/watchedMoviesStore';
import Pagination from '../Components/Pagination';
import PageNumber from '../stores/pageStore';
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
      <div key={index} className="three wide column">
        <div className="ui card">
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
        <div className="ui stackable two column very relaxed grid container">
          <div className="ui horizontal divider">{movieListStore.movieCategories} Page #{PageNumber.page}</div>
          <div className="three wide column">
            <div className="ui fluid vertical menu">
              <a className="item" onClick={movieListStore.getPopularMoviesList.bind(this)}>Popular Movies</a>
              <a className="item" onClick={movieListStore.getNowPlayingMoviesList.bind(this)}>Now Playing</a>
              <a className="item" onClick={movieListStore.getTopRatedMoviesList.bind(this)}>Top Rated</a>
              <a className="item" onClick={movieListStore.getUpcomingMoviesList.bind(this)}>Upcoming Movies</a>
            </div>
          </div>
          <div className="thirteen wide column">
            <div className="ui three column doubling stackable grid container">
              {MoviesListed}
              <div><Pagination /></div>
            </div>
          </div>
        </div>
    );
  }
}

export default Movies;

