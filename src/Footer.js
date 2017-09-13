import React, { Component } from 'react';
import './App.css';

class Footer extends Component {

    render() {
        return (
            <div className="ui inverted vertical footer segment">
                <div className="ui container">
                    <div className="ui stackable inverted divided equal height center aligned stackable grid">
                        <div className="three wide column">github link</div>
                        <div className="three wide column">linkedin link</div>
                        <div className="three wide column">Powered by tmdb</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Footer;