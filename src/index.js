import React from 'react';
import ReactDOM from 'react-dom';
import PopularMovies from './components/Movies';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Callback from './utils/Callback';

const Root = () => {
  return (
    <div className="uk-container">
      <Router>
        <switch>
          <Route path="/" component={PopularMovies} />
          <Route path="/callback" component={Callback} />
        </switch>
      </Router>
    </div>
  )
}

ReactDOM.render(<Root />, document.getElementById('root'));
