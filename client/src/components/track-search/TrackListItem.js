import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export class TrackListItem extends Component {

    state = {
        name: this.props.name,
        artist: this.props.artist,
        ...this.props.state
    }

    componentDidMount() {
        this.setState({
            name: this.props.name,
            artist: this.props.artist,
            ...this.props.state
        })
    }

    render() {
        if (!this.props.state.returnedTracks) {
            return '... Loading'
        } else {

        return (
            <Link to={{
                pathname: `/tools/${this.state.loggedInUser.id}/book/${this.state.activeBook.id}/page/${this.state.activePage.id}/editor`,
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
