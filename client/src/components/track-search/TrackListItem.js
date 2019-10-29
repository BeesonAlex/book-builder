import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export class TrackListItem extends Component {

    state = {
        artist: this.props.artist,
        name: this.props.name,
        ...this.props.appState
    }

    componentDidMount() {

        this.setState({
            ...this.props.appState
        })
    }

    render() {

        if (!this.props.state.loggedInUser) {
            return '... Loading'
        } else {

        return (
            <Link to={{
                pathname: `/tools/${this.props.state.loggedInUser.id}/book/${this.props.state.activeBook.id}/page/${this.props.state.activePage.id}/editor`,
                state: this.state,
            }}>
            <div className="tracklist-item">
                <h1 className="tracklist__title">{this.props.name}</h1>
                <h2 className="tracklist__artist">{this.props.artist}</h2>
                    <button className="tracklist__button">Select</button>
            </div>
            </Link>
        )
        }
    }
}

export default TrackListItem
