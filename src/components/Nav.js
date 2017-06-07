import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

class Nav extends Component {

  render() {
    return (
      <nav className="uk-nav">
        <div className="uk-nav">
          <Link className="navbar-brand" to="/">Popular Movies</Link>
        </div>
        <ul className="uk-nav">
          <li><button className="btn btn-info log">Log In</button></li>
          <li><button className="btn btn-danger log">Log out </button></li>
        </ul>
      </nav>
    );
  }
}

export default Nav;
