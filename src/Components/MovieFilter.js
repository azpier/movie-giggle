import React, { Component } from 'react';

class MovieFilter extends Component {

    render() {
        return (

            <div className="tabs is-centered">
                <ul>
                    <li><a onClick={this.props.popular}>Popular Movies</a></li>
                    <li><a onClick={this.props.nowPlaying}>Now Playing</a></li>
                    <li><a onClick={this.props.topRated}>Top Rated</a></li>
                    <li><a onClick={this.props.upcoming}>Upcoming Movies</a></li>
                </ul>
            </div>
        )
    }
}

export default MovieFilter;