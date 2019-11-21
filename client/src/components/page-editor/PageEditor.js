import React, { Component } from 'react';
import axios from 'axios';
import './PageEditor.scss';

export class PageEditor extends Component {

    state = {
    trackLoading: true,
    trackDetails: {},
    ...this.props.appState
    }    

    componentDidMount() {
        this.setState({
            ...this.props.appState,
            trackLoading: true,
        })

        const artist = this.props.appState.artist || this.state.activePage.artist
        const name = this.props.appState.name || this.state.activePage.track

    axios.get(`https://serene-journey-89429.herokuapp.com/data/track/${artist}/${name}`)
    .then(res => {
        this.setState({
            trackDetails: res.data,
        }, () => {
            // must increase size of album art
            let editedTrackDetails = {
                name: this.state.trackDetails.name,
                artist: this.state.trackDetails.artist.name,
                album: this.state.trackDetails.album.title,
                albumArt: Object.values(this.state.trackDetails.album.image[3])[0].replace('300x300', '1200x1200')
            }
            this.setState({
                trackDetails: {
                    ...editedTrackDetails
                },
                trackLoading: false,
            })
            
        });
    })
    .catch(err => {
        console.log(err)
    })
}


onSubmitHandler = event => {
    event.preventDefault();
    this.setState({

        activePage: {
            id: this.state.activePage.id,
            pageNumber: this.state.activeBook.pages.length + 1,
            track: `${this.state.trackDetails.name}`,
            album: `${this.state.trackDetails.album}`,
            albumArt: `${this.state.trackDetails.albumArt}`,
            artist: `${this.state.trackDetails.artist}`,
            thoughts: event.target.thoughts.value,
            pageContentUrl: this.state.activePage.pageContentUrl,
        }

    }, () => {

        const activePages = this.state.activeBook.pages;

        const targetPage = activePages.findIndex(page => {
            return page.id === this.state.activePage.id;
        });

        if (targetPage !== -1) {
            activePages[targetPage] = this.state.activePage;

        } else if (targetPage === -1) {
            activePages.push(this.state.activePage);
        }

        this.setState({
            activeBook: {
                id: this.state.activeBook.id,
                title: this.state.activeBook.title,
                contentUrl: this.state.activeBook.contentUrl,
                coverUrl: this.state.activeBook.coverUrl,
                pages: activePages,
            },
            trackLoading: true,
            trackDetails: {},
            isSearched: false,
            searchedTrack:'',
            returnedTracks: [],
            name: '',
            artist: ''
        }, () => {

            this.props.updateAppState(this.state)
            this.props.history.push(`/tools/${this.state.loggedInUser.id}/book/${this.state.activeBook.id}`)
        })
    });
}

    render() {
        console.log(this.state)
        if (this.state.trackLoading) {
            return <p>loading...</p>
        } else {

        return (
            <>
            <div className="pageeditor">
                <div className="pageeditor__editor-wrapper">
                    <div className="pageeditor__album-wrapper">
                    <img className="pageeditor__album-art" src={this.state.trackDetails.albumArt} alt="album-art" />
                    </div>
                    <form className="pageeditor__form" onSubmit={this.onSubmitHandler}>
                    <div className="pageditor__text-wrapper">
                        <h1 className="pageeditor__song-title">{this.state.trackDetails.name}</h1>
                        <div className="pageeditor__artist-album-wrapper">
                        <h3 className="pageeditor__artist-title">{this.state.trackDetails.artist}</h3>
                        <h3 className="pageeditor__artist-album">{this.state.trackDetails.album}</h3>
                        </div>
                        <input className="pageeditor__thoughts" type="text" name="thoughts" placeholder="Write your thoughts..." defaultValue={this.state.activePage.thoughts}></input>
                    </div>
                    <button className="pageeditor__submit btn" type="submit">Save and Close</button>
                    </form>
                </div>
            </div>
            </>
        )
        }
    }
}

export default PageEditor