import React, { Component } from 'react'

export class TrackListItem extends Component {

    render() {
        if (!this.props.name) {
            return '... Loading'
        } else {

        return (
            <div className="tracklist-item">
                <h1 className="tracklist__title">{this.props.name}</h1>
                <h2 className="tracklist__artist">{this.props.artist}</h2>
                <button className="tracklist__button btn" onClick={() => this.props.onTrackListItemClick(this.props.name, this.props.artist)}>Select</button>
            </div>
        )
        }
    }
}

export default TrackListItem
