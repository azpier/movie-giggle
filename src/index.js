import React from 'react';
import ReactDOM from 'react-dom';
import PopularMovies from './components/Movies';
import WatchedList from './components/WatchedList';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Callback from './utils/Callback';
import { isLoggedIn } from './utils/AuthService';

const Root = () => {
  return (
    <div className="uk-container">
      <Router>
        <switch>
          <Route exact path="/" component={PopularMovies} />
          <Route path="/callback" component={Callback} />
          <RouteWhenAuthorized path="/watchedlist" component={WatchedList} />
        </switch>
      </Router>
    </div>
  )
}

const RouteWhenAuthorized = ({component: Component, ...rest}) => (
  <Route {...rest} render={renderProps => (
    isLoggedIn() ? (
      <Component {...renderProps} />
    ) : ( alert('Login to see this page'),
      <Redirect to={ {
        pathname: '/',
        state: {from: renderProps.location}
      } } />
    )
  )}/>
)

ReactDOM.render(<Root />, document.getElementById('root'));
