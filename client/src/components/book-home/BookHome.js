import React, { Component } from 'react'
// import PagePreview from './PagePreview';
import { Link } from 'react-router-dom';

export class BookHome extends Component {

    state = {
        isLoggedIn: false,
        loggedInUser: {
            _id: this.props.location.state.loggedInUser._id,
            name: this.props.location.state.loggedInUser.name,
            title: this.props.location.state.loggedInUser.title,
            email: this.props.location.state.loggedInUser.email,
        },
    }


    render() {
        return (
            <div className="bookhome">
                <div className="bookhome__information-wrapper">
                <h1 className="bookhome__title">{this.state.loggedInUser.title}</h1>
                <p className="bookhome__author">{this.state.loggedInUser.name}</p>
                </div>
                <Link to={{
                    pathname: `/1/track-search`
                }}>
                <button className="bookhome__button--add-page">Add a Page</button>
                </Link>
                <div className="bookhome__pages-wrapper">
                {/* {this.props.pages.map(page => {
                                return <PagePreview title={this.props.songTitle} artist={this.props.artist} isComplete={this.props.completionStatus} />
                            })} */}
                </div>
            </div>
        )
    }
}

export default BookHome
