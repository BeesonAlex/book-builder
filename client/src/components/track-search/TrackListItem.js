import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export class TrackListItem extends Component {

    render() {
        return (
            <div className="tracklist-item">
                <h1 className="tracklist__title">{this.props.name}</h1>
                <h2 className="tracklist__artist">{this.props.artist}</h2>
                <Link to={{
                pathname:`/1/pages/1/track/${this.props.name}/artist/${this.props.artist}/page-editor`
                }}>
                    <button className="tracklist__button">Select</button>
                </Link>
            </div>
        )
    }
}

export default TrackListItem
