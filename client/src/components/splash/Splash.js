import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Splash extends Component {
    render() {
        return (
            <div className="splash">
                <div className="splash__content-header">
                    <h1 className="splash__title">Welcome to the Book Editor!</h1>
                    <Link to={'/book-home'}><button className="splash__get-started-button">Create New Book</button></Link>
                </div>
            </div>
        )
    }
}

export default Splash
