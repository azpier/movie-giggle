import React, { Component } from 'react';
import { login, logout, isLoggedIn } from '../utils/AuthService';
import '../App.css';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';


const AuthButton = withRouter(({ history }) => (
   (isLoggedIn()) ? ( <button className="uk-button" onClick={() => logout(history.push('/'))}>Log out </button> ) : ( <button className="uk-button" onClick={() => login()}>Log In</button> )
))

class Nav extends Component {

  render() {
    return (
      <nav className="uk-navbar uk-navbar-container">
        <div className="uk-navbar-center">
        <ul className="uk-navbar-nav">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/watchedlist">Watched List</Link></li>
        </ul>
        </div>
        <div className="uk-navbar-right uk-padding-small"><AuthButton /></div>      
      </nav>
    );
  }
}

export default Nav;
