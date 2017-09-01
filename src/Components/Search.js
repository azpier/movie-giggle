import React, { Component } from 'react';
import { Search, Grid } from 'semantic-ui-react';
import axios from 'axios';
import ModalMovies from '../Components/ModalMovies';
import imageNotAvailable from '../../public/images/notavailable.jpg';

export default class SearchExampleStandard extends Component {
  constructor() {
    super();
    this.state = {
      source: [],
      modalState: false,
      resultId: ""
    }
  }

  componentWillMount() {
    this.resetComponent();
  }

  getSource = (query) => {
    if (query !== "") {
      return axios.get(`https://api.themoviedb.org/3/search/movie?api_key=f1bdbd7920bf91cc1db6cc18fe23f6ab&language=en-US&query=${query}&page=1&include`)
        .then(res => this.setState({ source: res.data.results }));
    }
  }

  resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

  handleResultSelect = ((e, { result }) => {
    this.setState({ value: result.title, modalState: true, resultId: result.id });
  });

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })
    this.getSource(value);
    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent()

      const { source } = this.state;
      const isMatch = source.map((el, i) => {
        if (el.poster_path === null) {
          return { title: el.title, id: el.id, key: i, image: imageNotAvailable }
        } else {
          return { title: el.title, id: el.id, key: i, image: "https://image.tmdb.org/t/p/w500/" + el.poster_path }
        }

      });

      this.setState({
        isLoading: false,
        results: isMatch
      })
    }, 500)
  }

  handleModalClose = () => this.setState({ modalState: false });

  render() {
    const { isLoading, value, results, modalState, resultId } = this.state

    return (
      <Grid>
        <Grid.Column width={8}>
          <Search
            loading={isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={this.handleSearchChange}
            results={results}
            value={value}
            {...this.props}
          />
        </Grid.Column>
        <ModalMovies movie={resultId} open={modalState} onClose={this.handleModalClose} />
      </Grid>
    )
  }
}