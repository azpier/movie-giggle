import React, { Component } from 'react';

class LoginPage extends Component {
  //this is the login page that shows when the user it not logged in and the page hes trying to access needs auth to display.
  login() {
    this.props.auth.login();
  }
  render() {
    return (
      <div className="ui container alert-text">
        <div className="ui container center aligned">
          <div className="ui compact red message">
            <div className="header">
              Please log in to create movie lists.
          </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginPage;