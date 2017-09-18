import React, { Component } from 'react';
import './App.css';
import tmdb from '../public/images/tmdb-logo.svg';

class Footer extends Component {

    render() {
        return (
            <div className="ui inverted vertical footer segment">
                <div className="ui container">
                    <div className="ui stackable inverted divided equal height middle aligned center aligned stackable grid">
                        <div className="three wide column"><a href="https://github.com/estebanred" target="_blank" className="footer-social"><i className="big github icon"></i></a></div>
                        <div className="three wide column"><a href="https://www.linkedin.com/in/esteban-rojas-4401a286" target="_blank" className="footer-social"><i className="big linkedin square icon"></i></a></div>
                        <div className="three wide column"><img className="tmdb-logo" src={tmdb} alt="tmdb" /></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Footer;