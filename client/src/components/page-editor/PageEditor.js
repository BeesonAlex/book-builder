import React, { Component } from 'react';
import axios from 'axios';

export class PageEditor extends Component {

    state = {
    isLoading: true,
    trackDetails: {},
    }    
    
    componentDidMount() {

    const { artist, track } = this.props.match.params

    axios.get(`http://localhost:8080/data/track/${artist}/${track}`)
    .then(res => {
        this.setState({
            trackDetails: res.data,
            isLoading: false,
        });
    });

}

    render() {

        if (this.state.isLoading) {
            return <p>loading...</p>
        } else {

        return (
            <div className="pageeditor">
                <div className="pageeditor__editor-wrapper" style={{ backgroundImage: `url(${Object.values(this.state.trackDetails.album.image[3])[0]})`}}>
                <form className="pageeditor__form">
                    <div className="pageditor__text-wrapper">
                        <h1 className="pageeditor__song-title">{this.state.trackDetails.name}</h1>
                        <h2 className="pageeditor__artist-title">{this.state.trackDetails.artist.name}</h2>
                        <input className="pageeditor__thoughts" type="text" name="thoughts" placeholder="Write your thoughts..."></input>
                    </div>
                    <button type="submit">Save</button>
                    </form>
                </div>
            </div>
        )
        }
    }
}

export default PageEditor