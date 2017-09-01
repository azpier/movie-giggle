import React from 'react';
import { Redirect, Route, BrowserRouter } from 'react-router-dom';
import Nav from './Nav';
import LoginPage from './Components/LoginPage';
import Movies from './Components/Movies';
import WatchedMovies from './Components/WatchedMovies';
import Callback from './Callback/Callback';
import Auth from './Auth/Auth';
import history from './history';

const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
}

export const makeMainRoutes = () => {

  return (
    <BrowserRouter history={history}>
      <div>
        <Route render={(props) => <Nav auth={auth} {...props} />} />
        <Route exact path="/" render={(props) => <Movies auth={auth} {...props} />} />
        <Route path="/login" render={(props) => <LoginPage auth={auth} {...props} />} />
        <Route path="/watchedlist" render={(props) => (
          !auth.isAuthenticated() ? (
            <Redirect to="/login" />
          ) : (
              <WatchedMovies auth={auth} {...props} />
            )
        )} />
        <Route path="/callback" render={(props) => {
          handleAuthentication(props);
          return <Callback {...props} />

        }} />
      </div>
    </BrowserRouter>
  );
}
