import React from 'react';
import ReactDOM from 'react-dom';
import PopularMovies from './components/Movies';
import { BrowserHistory } from 'react-history';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

const Root = () => {
  return (
    <div className="uk-container">
      <Router history={BrowserHistory}>
        <Route path="/" component={PopularMovies}/>
      </Router>
    </div>
  )
}

ReactDOM.render(<Root />, document.getElementById('root'));
