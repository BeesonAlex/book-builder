import React, { Component } from 'react';
import axios from 'axios';

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
                album: this.state.trackDetails.album.name,
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

textChangeHandler = event => {
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
    })
}


    render() {
        console.log(this.state)
        if (this.state.trackLoading) {
            return <p>loading...</p>
        } else {

        return (
            <>
            <div className="header">
                <div className="header__left-wrapper">
                    <h1 className="header__title">Book Home</h1>
                </div>
                <div className="header__mid-wrapper">
                    <p className="header__left-button">Previous</p>
                    <p className="header__page-number">{this.state.activePage.pageNumber}</p>
                    <p className="header__right-button">Next</p>
                </div>
            </div>
            <div className="pageeditor">
                <div className="pageeditor__editor-wrapper" style={{ backgroundImage: `url(${this.state.trackDetails.albumArt})`}}>
                <form className="pageeditor__form" onSubmit={this.onSubmitHandler}>
                    <div className="pageditor__text-wrapper">
                        <h1 className="pageeditor__song-title">{this.state.trackDetails.name}</h1>
                        <h2 className="pageeditor__artist-title">{this.state.trackDetails.artist}</h2>
                        <h2 className="pageeditor__artist-title">{this.state.trackDetails.album}</h2>
                        <input className="pageeditor__thoughts" type="text" name="thoughts" placeholder="Write your thoughts..." value={this.state.activePage.thoughts} onChange={this.textChangeHandler}></input>
                    </div>
                    <button type="submit">Save and Close</button>
                    </form>
                </div>
            </div>
            </>
        )
        }
    }
}

export default PageEditor