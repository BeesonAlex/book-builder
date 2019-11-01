import React, { Component } from 'react';
import './TrackSearch.scss';
import axios from 'axios';
import TrackListItem from './TrackListItem';




export class TrackSearch extends Component {
    
    state = {
        isSearched: false,
        searchedTrack:'',
        returnedTracks: [],
        ...this.props.appState
    }

    componentDidMount() {

        this.setState({
            ...this.props.appState
        })
    }

    componentWillUnmount() {

        this.setState({
            isSearched: false,
            searchedTrack:'',
            returnedTracks: [],
        })
    }

    onSubmitHandler = event => {
        event.preventDefault();
        const id = event.target.search__criteria.value
 
        axios
            .get(`https://serene-journey-89429.herokuapp.com/data/${id}`)
            .then(res => {
                this.setState({
                    isSearched: true,
                    searchedTrack: id,
                    returnedTracks: res.data,
                });
            });
    };


    render() {
        console.log(this.state)
        return (
            <div className="tracksearch">
                <div className="tracksearch__wrapper">
                        <h1 className="tracksearch__title">Choose a Song Below</h1>
                        <form className="tracksearch__form" onSubmit={this.onSubmitHandler}>
                        <input className="tracksearch__search" type="text" name="search__criteria" placeholder="Search"></input>
                        <button type="submit">Search</button>
                        </form>
                </div>
                <div className="tracksearch__listings">
                {   this.state.returnedTracks ?
                    this.state.returnedTracks.map(track => {
                        return (
                            <TrackListItem state={this.state} key={track.listeners} artist={track.artist} name={track.name} />
                    )})
                : 'Search for a track to Continue'
                }
                </div>
            </div>
        )
    }
}

export default TrackSearch