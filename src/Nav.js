import React, { Component } from 'react';
import './App.css';

class Nav extends Component {

  goTo(route) {
    this.props.history.replace(`${route}`)
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
      <div className="ui grid">
        <div className="mobile only row">
          <div className="ui three item menu">
            <a className="item" onClick={this.goTo.bind(this, '/')}>Movies</a>
            <a className="item" onClick={this.goTo.bind(this, '/watchedlist')}>Watched List</a>
            {!isAuthenticated() && (
              <a className="item" onClick={this.login.bind(this)}><i className="user icon"></i>Log In</a>
            )
            }
            {isAuthenticated() && (
              <a className="item" onClick={this.logout.bind(this)}><i className="user outline"></i>Log Out</a>
            )
            }
          </div>
        </div>
        <div className="computer only row">
          <div className="ui menu desktop-main-menu">
            <div className="right menu">
              <a className="item" onClick={this.goTo.bind(this, '/')}>Movies</a>
              <a className="item" onClick={this.goTo.bind(this, '/watchedlist')}>Watched List</a>
              {!isAuthenticated() && (
                <a className="item" onClick={this.login.bind(this)}><i className="user icon"></i>Log In</a>
              )
              }
              {isAuthenticated() && (
                <a className="item" onClick={this.logout.bind(this)}><i className="user outline"></i>Log Out</a>
              )
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Nav;
