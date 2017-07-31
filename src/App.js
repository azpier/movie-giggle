import React, { Component } from 'react';
import './App.css';
import 'bulma/css/bulma.css';
import DevTools from 'mobx-react-devtools';
import Auth from '../src/Auth/Auth';

class App extends Component {

  componentWillMount() {
    this.auth = new Auth();

    if(this.auth.isAuthenticated()){
      this.auth.getProfile();
    }
  }

  goTo(route) {
    this.props.history.replace(`/${route}`)
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    return (

      <nav className="navbar">
        <div>
          <DevTools />
        </div>
        <div className="navbar-end navbar-menu">
          <a className="navbar-item" onClick={this.goTo.bind(this, 'movies')}>Home</a>
          <a className="navbar-item" onClick={this.goTo.bind(this, 'watchedlist')}>Watched List</a>
        </div>
        <div>
          {!isAuthenticated() && (
            <div className="nav-item">
              <div className="field is-grouped">
                <p className="control">
                  <a className="button is-primary" onClick={this.login.bind(this)}>
                    <span className="icon">
                      <i className="fa fa-sign-in"></i>
                    </span>
                    <span>Log In</span>
                  </a>
                </p>
              </div>
            </div>
          )
          }
          {isAuthenticated() && (
            <div className="nav-item">
              <div className="field is-grouped">
                <p className="control">
                  <a className="button is-danger" onClick={this.logout.bind(this)}>
                    <span className="icon">
                      <i className="fa fa-sign-out"></i>
                    </span>
                    <span>Log Out</span>
                  </a>
                </p>
              </div>
            </div>
          )
          }
        </div>
      </nav>
    );
  }
}

export default App;
