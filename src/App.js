import React, { Component } from 'react';
import './App.css';

class App extends Component {
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
      <nav className="uk-navbar-container uk-navbar uk-padding-small">
        <div className="uk-navbar-right">
          <button className="uk-button uk-button-default" onClick={this.goTo.bind(this, 'movies')}>Home</button>
          <button className="uk-button uk-button-default" onClick={this.goTo.bind(this, 'profile')}>Profile</button>
          <button className="uk-button uk-button-default" onClick={this.goTo.bind(this, 'movies')}>Watched List</button>
          {
            !isAuthenticated() && (
              <button className="uk-button uk-button-primary" onClick={this.login.bind(this)}>Log In</button>
            )
          }
          {
            isAuthenticated() && (
              <button className="uk-button uk-button-danger" onClick={this.logout.bind(this)}>Log Out</button>
            )
          }
        </div>
      </nav>
    );
  }
}

export default App;
