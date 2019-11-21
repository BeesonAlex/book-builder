import React, { Component } from 'react'

export class TrackListItem extends Component {

    render() {
        if (!this.props.name) {
            return '... Loading'
        } else {

        return (
            <div className="tracklist-item">
                <img className="tracklist__icon" src="https://cdn.shopify.com/s/files/1/0262/0584/7649/files/music.svg?73" alt="music-note-icon" />
                <h3 className="tracklist__title">{this.props.name}</h3>
                <p className="tracklist__artist">{this.props.artist}</p>
                <button className="tracklist__button btn--secondary-accent" onClick={() => this.props.onTrackListItemClick(this.props.name, this.props.artist)}>Select</button>
            </div>
        )
        }
    }
}

export default TrackListItem
