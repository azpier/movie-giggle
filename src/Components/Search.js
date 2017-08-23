import React, { Component } from 'react';
import axios from 'axios';
import movieListStore from '../stores/movieListStore';

class SearchModule extends Component {
    constructor() {
        super();
        this.state = { searchValue: '' };
    }
    searchMovie(query) {
        movieListStore.movies = [];
        return axios.get(`https://api.themoviedb.org/3/search/movie?api_key=f1bdbd7920bf91cc1db6cc18fe23f6ab&language=en-US&query=${query}&page=1&include`)
            .then(res => movieListStore.movies = res.data.results);
    }

    updateSearch(event) {
        event.persist();
        this.setState({ searchValue: event.target.value.substr(0, 20) }, () => {
            if (this.state.searchValue.length > 0) {
                this.searchMovie(event.target.value);
            }
            else {
                movieListStore.getPopularMoviesList()
            }
        });

    }

    render() {

        return (
            <div className="ui fluid input">
            <input type="text" value={this.state.searchValue} onChange={this.updateSearch.bind(this)} placeholder="Filter movies by title" />
            </div>
            
        )
    }
}

export default SearchModule;