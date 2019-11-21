import React, { Component } from 'react'

export class TrackListItem extends Component {

    render() {
        if (!this.props.name) {
            return '... Loading'
        } else {

        return (
            <div className="tracklist-item">
                <h3 className="tracklist__title">{this.props.name}</h3>
                <p className="tracklist__artist">{this.props.artist}</p>
                <button className="tracklist__button btn--secondary-accent" onClick={() => this.props.onTrackListItemClick(this.props.name, this.props.artist)}>Select</button>
            </div>
        )
        }
    }
}

export default TrackListItem
