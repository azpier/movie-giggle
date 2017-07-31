import { observable, action } from "mobx";
import userProfile from '../stores/userProfileStore';
import loadingStore from '../stores/loadingStore';
import Auth from '../Auth/Auth';
import axios from 'axios';

class WatchedMoviesStore {
    @observable watched = [];

    constructor() {
        this.auth = new Auth();
    }

    @action getWatchedData() {
        let arrayWatchedList = [];

        if (this.auth.isAuthenticated()) {

            loadingStore.changeLoadingStatusTrue();
            return axios.get('https://movie-giggle-backend.herokuapp.com/api/userwatched/:', {
                params: {
                    userID: userProfile.profile.sub
                }
            }).then((response) => {
                if (response.data.length > 0) {
                    response.data.map((watchedMovies) => {
                        const searchID = watchedMovies.movieID;
                        const url = `https://api.themoviedb.org/3/movie/${searchID}?api_key=f1bdbd7920bf91cc1db6cc18fe23f6ab&language=en-US`;
                        return axios.get(url).then((response) => {
                            response.data.addedOrder = watchedMovies.addedOrder;
                            arrayWatchedList.push(response.data);
                            this.watched = arrayWatchedList;
                        })
                    })
                    loadingStore.changeLoadingStatusFalse();
                } else {
                    this.watched = arrayWatchedList;
                    loadingStore.changeLoadingStatusFalse();
                }
            })
        }
    }

    @action saveWatchedMovies(index, selectedMovie, event) {

        return axios.post('https://movie-giggle-backend.herokuapp.com/api/userwatched', {
            userID: userProfile.profile.sub,
            movieID: selectedMovie,
            addedOrder: new Date()
        }).then(() => { watchedMoviesStore.getWatchedData() })
    }

    @action deleteWatchedMovie(index, selectedMovie, event) {

        return axios.delete('https://movie-giggle-backend.herokuapp.com/api/userwatched', {
            params: {
                movieID: selectedMovie,
                userID: userProfile.profile.sub
            }
        }).then(() => { watchedMoviesStore.getWatchedData() })
    }
}

const watchedMoviesStore = new WatchedMoviesStore();
export default watchedMoviesStore;