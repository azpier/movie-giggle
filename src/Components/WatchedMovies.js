import React, { Component } from 'react';
import axios from 'axios';
import { observer } from "mobx-react";
import { observable, action } from "mobx";
import '../App.css';
import FontAwesome from 'react-fontawesome';
import ModalMovies from './ModalMovies';

@observer class WatchedMovies extends Component {
  @observable profile = [];
  @observable userWatched = [];

  constructor(props) {
    super(props);

    let userProfile = localStorage.getItem('user_profile');
    userProfile = JSON.parse(userProfile);

    this.profile = userProfile;
  }

  //Gets user selection from DB for API query
  @action getWatchedData() {
    let arrayWatchedList = [];

    return axios.get('http://localhost:8080/api/userwatched/:', {
      params: {
        userID: this.profile.sub
      }
    }).then((response) => {
      response.data.map((watchedMovies) => {
        const searchID = watchedMovies.movieID;
        const url = `https://api.themoviedb.org/3/movie/${searchID}?api_key=f1bdbd7920bf91cc1db6cc18fe23f6ab&language=en-US`;
        //call tmdb api here!!!
        return axios.get(url).then((response) => {
          response.data.addedOrder = watchedMovies.addedOrder;
          arrayWatchedList.push(response.data);
          this.userWatched = arrayWatchedList;
        })
      });
    })
  }

  @action refreshData() {

    let arrayWatchedList = [];

    return axios.get('http://localhost:8080/api/userwatched/:', {
      params: {
        userID: this.profile.sub
      }
    }).then((response) => {
      if (response.data.length !== 0) {
        response.data.map((watchedMovies) => {
          const searchID = watchedMovies.movieID;
          const url = `https://api.themoviedb.org/3/movie/${searchID}?api_key=f1bdbd7920bf91cc1db6cc18fe23f6ab&language=en-US`;
          //call tmdb api here!!!
          return axios.get(url).then((response) => {
            response.data.addedOrder = watchedMovies.addedOrder;
            arrayWatchedList.push(response.data);
            this.userWatched = arrayWatchedList;
          })
        });
      } else {
        //add stuff here to re render component
        this.userWatched = "";
      }
    })
  }

  componentWillMount() {
    this.getWatchedData();
  }

  render() {

    if (this.userWatched !== "") {
      this.userWatched.sort(function (a, b) {
        return new Date(a.addedOrder) - new Date(b.addedOrder);
      });
    }

    if (this.userWatched.length === 0) {
      return (
        <div>The list is empty</div>
      )
    } else {
      return (
        <div>
          <div className="container section">
            <div className="columns is-multiline">
              {this.userWatched.map((movie, index) => (
                <div key={index} className="column is-half">
                  <div className="columns">
                    <div className="column is-3">
                      <img src={"https://image.tmdb.org/t/p/w500/" + movie.poster_path} alt="main" className="posterImg card" />
                    </div>
                    <div className="column">
                      <h3>{movie.original_title}</h3>
                      <p>{movie.runtime} Minutes</p>
                      <p>Year: ({movie.release_date.slice(0, 4)})</p>
                      <p>Rating: {movie.vote_average}</p>
                      <div className="columns">
                        <div className="column">
                          <ModalMovies movie={movie} />
                        </div>
                        <div className="column">
                          <DeleteButton watchedList={this.userWatched} profile={this.profile} index={index} getContent={this.refreshData.bind(this)} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }
  }
}

export default WatchedMovies;

//delete button component
class DeleteButton extends Component {

  Constructor() {
    this.deleteWatchedMovie = this.deleteWatchedMovie.bind(this)
  }

  deleteWatchedMovie(event) {
    const userWatched = this.props.watchedList;
    const index = this.props.index;
    const selectedMovie = userWatched[index].id;
    const userID = this.props.profile.sub;

    axios.delete('http://localhost:8080/api/userwatched', {
      params: {
        movieID: selectedMovie,
        userID: userID
      }
    }).then(() => this.props.getContent())
  }
  render() {
    return (
      <a onClick={this.deleteWatchedMovie.bind(this)} className="removeWatchedListBtn"><FontAwesome name="fa-window-close" className="fa fa-window-close" size="2x" /></a>
    );
  }
}
