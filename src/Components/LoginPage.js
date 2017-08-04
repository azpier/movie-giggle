import React, { Component } from 'react';

class LoginPage extends Component {
  login() {
    this.props.auth.login();
  }
  render() {
    return (
      <div className="ui container center aligned">
        <div className="ui compact red message">
            <div className="header">
              Please log in to create movie lists.
            </div>
        </div>
      </div>
    );
  }
}

export default LoginPage;
