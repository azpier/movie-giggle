import React, { Component } from 'react';
import axios from 'axios';

class WatchedMovies extends Component {

  constructor(props) {
    super(props)

    this.state = {
      userWatched: []
    };
    this.getWatchedData();
  }

  //Gets user selection from DB for API query
  getWatchedData() {

    let arrayWatchedList = [];

    let userProfile = localStorage.getItem('user_profile');
    userProfile = JSON.parse(userProfile);

    return axios.get('http://localhost:8080/api/userwatched/:', {
      params: {
        userID: userProfile.sub
      }
    })
      .then((response) => {
        response.data.map((watchedMovies) => {
          const searchID = watchedMovies.movieID;
          const url = `https://api.themoviedb.org/3/movie/${searchID}?api_key=f1bdbd7920bf91cc1db6cc18fe23f6ab&language=en-US`;
          //call tmdb api here!!!
          return axios.get(url)
            .then((response) => {
              response.data.addedOrder = watchedMovies.addedOrder;
              arrayWatchedList.push(response.data);
              this.setState({
                userWatched: arrayWatchedList
              });

            })
        });
      })
  }

  refreshData() {

    let arrayWatchedList = [];

    let userProfile = localStorage.getItem('user_profile');
    userProfile = JSON.parse(userProfile);

    return axios.get('http://localhost:8080/api/userwatched/:', {
        params: {
          userID: userProfile.sub
        }
      })
      .then((response) => {
        if(response.data.length !== 0){
        response.data.forEach((watchedMovies) => {
          const searchID = watchedMovies.movieID;
          const url = `https://api.themoviedb.org/3/movie/${searchID}?api_key=f1bdbd7920bf91cc1db6cc18fe23f6ab&language=en-US`;
          //call tmdb api here!!!
          return axios.get(url)
            .then((response) => {
              response.data.addedOrder = watchedMovies.addedOrder;
              arrayWatchedList.push(response.data);
              this.setState({
                userWatched: arrayWatchedList
              });
            })
        });
        } else {
          //add stuff here to re render component
          this.setState({userWatched: ""})
        }
      })
  }

  render() {

    const { userWatched } = this.state;
    if (userWatched !== "") {
      userWatched.sort(function (a, b) {
        return new Date(a.addedOrder) - new Date(b.addedOrder);
      });
    }
    

    let userProfile = localStorage.getItem('user_profile');
    userProfile = JSON.parse(userProfile);

    if (userWatched.length === 0) {
      return (
        <div>The list is empty</div>
      )
    } else {
      return (
        <div>
          <div className="uk-container uk-section">
            <h3 className="uk-text-center">Hello {userProfile.name}</h3>
            <hr />
            <div className="uk-grid uk-grid-match uk-child-width-1-5@m">
              {userWatched.map((movie, index) => (
                <div key={index} className="uk-padding">
                  <div className="uk-card uk-card-default uk-card-hover uk-text-center">
                  <span>{movie.addedOrder}</span>
                    <img src={"https://image.tmdb.org/t/p/w500/" + movie.poster_path} alt="main-images" className="posterImg" />
                  </div>
                  <div className="uk-text-center">
                   <DeleteButton watchedList={this.state.userWatched} index={index} getContent={this.refreshData.bind(this)}/>
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
  
  Constructor (){
    this.deleteWatchedMovie= this.deleteWatchedMovie.bind(this)
  }

  deleteWatchedMovie(event) {
    
    const userWatched = this.props.watchedList;
    const index = this.props.index;

    const selectedMovie = userWatched[index].id;

    let userProfile = localStorage.getItem('user_profile');
    userProfile = JSON.parse(userProfile);

    const userID = userProfile.sub;

    axios.delete('http://localhost:8080/api/userwatched', {
        params: {
          movieID: selectedMovie,
          userID: userID
        }
      }).then(()=> this.props.getContent())
  }
  render() {
      return(
         <button onClick={ this.deleteWatchedMovie.bind(this) } className="removeFromWatchedBtn">Remove</button>
      );
  }
}