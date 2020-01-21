import React, { Component } from 'react';
import axios from 'axios';
import './PageEditor.scss';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
                album: this.state.trackDetails.album.title ? this.state.trackDetails.album.title : "",
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
            pageNumber: this.state.activePage.pageNumber || this.state.activeBook.pages.length + 1,
            track: `${this.state.trackDetails.name}`,
            album: `${this.state.trackDetails.album}`,
            albumArt: this.state.trackDetails.albumArt,
            artist: `${this.state.trackDetails.artist}`,
            thoughts: event.target.thoughts.value,
            pageContentUrl: this.state.activePage.pageContentUrl
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
                    <div className="pageeditor--text-wrapper">
                        <div className="pageeditor__icon-wrapper">
                            <img className="pageeditor__icon" src="https://cdn.shopify.com/s/files/1/0262/0584/7649/files/music.svg?87" alt="music-note" />
                        <h1 className="pageeditor__song-title">{this.state.trackDetails.name}</h1>
                        </div>
                        <div className="pageeditor__artist-album-wrapper">
                        <img className="pageeditor__icon" src="https://cdn.shopify.com/s/files/1/0262/0584/7649/files/user.svg?87" alt="user-icon" />
                        <p className="pageeditor__artist-title">{this.state.trackDetails.artist}</p>
                        <img className="pageeditor__icon" src="https://cdn.shopify.com/s/files/1/0262/0584/7649/files/disc.svg?87" alt="album-icon" />
                        <p className="pageeditor__artist-album">{this.state.trackDetails.album}</p>
                        </div>
                        <textarea className="pageeditor__thoughts" type="textarea" name="thoughts" wrap="hard" placeholder="Write your thoughts..." defaultValue={this.state.activePage.thoughts}></textarea>
                    </div>
                    <button className="pageeditor__submit btn" type="submit">Save and Close</button>
                    </form>
                </div>
                <p className="pageeditor__disclaimer">Please Note: The current page is designed to scale with your browser. The printed page will be 8.5" x 11".</p>
            </div>
            </>
        )
        }
    }
}

export default PageEditor