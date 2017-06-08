import React, { Component } from 'react';
import { login, logout, isLoggedIn } from '../utils/AuthService';
import '../App.css';
import { withRouter } from 'react-router-dom';


const AuthButton = withRouter(({ history }) => (
   (isLoggedIn()) ? ( <button onClick={() => logout(history.push('/'))}>Log out </button> ) : ( <button onClick={() => login()}>Log In</button> )
))

class Nav extends Component {

  render() {
    return (
      <nav className="uk-nav">
        <ul className="uk-nav">
          <li>
            <AuthButton />
          </li>
        </ul>
      </nav>
    );
  }
}

export default Nav;
