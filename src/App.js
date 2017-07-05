import React, {Component} from 'react';
import './App.css';
import 'bulma/css/bulma.css'

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

  getUserProfile() {

    const {isAuthenticated} = this.props.auth;
    const {userProfile, getProfile} = this.props.auth;

    if (isAuthenticated()) {
      if (!userProfile) {
        getProfile((err, profile) => {
          localStorage.setItem('user_profile', JSON.stringify(profile));
        });
      } else {
        localStorage.setItem('user_profile', JSON.stringify(userProfile));
      }
    }
  }

  componentWillMount() {
    this.getUserProfile();
  }

  render() {
    const {isAuthenticated} = this.props.auth;

    return (
      <nav className="nav">
        <div className="nav-right nav-menu">
          <a className="nav-item" onClick={this.goTo.bind(this, 'movies')}>Home</a>
          <a className="nav-item" onClick={this.goTo.bind(this, 'watchedlist')}>Watched List</a>
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
