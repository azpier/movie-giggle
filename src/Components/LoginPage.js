import React, { Component } from 'react';

class LoginPage extends Component {
  login() {
    this.props.auth.login();
  }
  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <div className="uk-section">
      <div className="uk-container uk-text-center">
        {
          isAuthenticated() && (
            <h2 className="uk-alert-success uk-padding">You are logged in!</h2>
          )
        }
        {
          !isAuthenticated() && (
            <h2 className="uk-alert-danger uk-padding">
              You are not logged in! Please{' '}
              <a style={{ cursor: 'pointer' }} onClick={this.login.bind(this)}>Log In</a>
              {' '}to access this area.</h2>
          )
        }
      </div>
      </div>
    );
  }
}

export default LoginPage;
