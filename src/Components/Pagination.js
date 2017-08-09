import React, { Component } from 'react';
import { observer } from 'mobx-react';
import PageNumber from '../stores/pageStore';
import movieListStore from '../stores/movieListStore';

@observer
class Pagination extends Component {

    goToPage() {
        switch (movieListStore.movieCategories) {
            case "Popular Movies": movieListStore.getPopularMoviesList();
                break;
            case "Now Playing Movies": movieListStore.getNowPlayingMoviesList();
                break;
            case "Top Rated Movies": movieListStore.getTopRatedMoviesList();
                break;
            case "Upcoming Movies": movieListStore.getUpcomingMoviesList();
                break;
            default: console.log("category not found");
        }

    }

    getPagePlus(num) {
        // eslint-disable-next-line
        PageNumber.page = PageNumber.page + num;
        this.goToPage();
    }

    getFirstPage(num) {
        PageNumber.page = num;
        this.goToPage();
    }

    render() {
        return (
            <div className="ui pagination menu">
                {
                    (PageNumber.page !== 1) ? (<a className="item" onClick={this.getPagePlus.bind(this, -1)}><i className="angle left icon"></i></a>) : (<a className="disabled item"><i className="angle left icon"></i></a>)
                }
                {
                    (PageNumber.page > 2) ? (<a className="item" onClick={this.getFirstPage.bind(this, 1)}>1</a>) : ("")
                }
                {
                    (PageNumber.page >2) ? (<a className="disabled item">...</a>) : ("")
                }
                {
                    (PageNumber.page > 1) ? (<a className="item" onClick={this.getPagePlus.bind(this, -1)}>{PageNumber.page - 1}</a>) : ("")
                }
                <a className="active item">{PageNumber.page}</a>
                <a className="item" onClick={this.getPagePlus.bind(this, 1)}>{PageNumber.page + 1}</a>
                <a className="item" onClick={this.getPagePlus.bind(this, 2)}>{PageNumber.page + 2}</a>
                {
                    (PageNumber.page === 1) ? (<a className="item" onClick={this.getPagePlus.bind(this, 3)}>{PageNumber.page + 3}</a>) : ("")
                }
                <a className="item" onClick={this.getPagePlus.bind(this, 1)}><i className="angle right icon"></i></a>
            </div>
        )
    }
}

export default Pagination;