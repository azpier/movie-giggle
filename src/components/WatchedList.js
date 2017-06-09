import React, { Component } from 'react';
import Nav from './Nav';
import { getMovieData } from '../utils/movie-api';


class WatchedList extends Component {

    constructor() {
        super()
        this.state = {
            movies: []
        };
    }

    getWatchedList() {
        getMovieData().then((movies) => {
            this.setState({ movies });
        });
    }

    componentDidMount() {
        this.getWatchedList();
    }

    render() {

        const { movies } = this.state;
        return <div> <Nav/> <p>Watched List</p>
            {movies.map((movie, index) => (
                <div key={index} className="uk-padding">
                    <div className="uk-card uk-card-default uk-card-hover uk-text-center">
                        <img src={"https://image.tmdb.org/t/p/w500/" + movie.poster_path} alt="main-images" />
                    </div>
                </div>
            ))}
        </div>

    }

}

export default WatchedList;