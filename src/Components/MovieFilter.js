import React, { Component } from 'react';

class MovieFilter extends Component {

    render() {
        return (
            <div>
                <a onClick={this.props.popular}>Popular Movies</a>
                <a onClick={this.props.nowPlaying}>Now Playing</a>
                <a onClick={this.props.topRated}>Top Rated</a>
                <a onClick={this.props.upcoming}>Upcoming Movies</a>
            </div>
        )
    }
}

export default MovieFilter;