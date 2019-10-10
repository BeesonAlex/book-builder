import React, { Component } from 'react';
import './TrackSearch.scss';
import axios from 'axios';
import TrackListItem from './TrackListItem';



export class TrackSearch extends Component {
    
    state = {
        isSearched: false,
        searchedTrack:'',
        returnedTracks: [],
    }

    onSubmitHandler = event => {
        event.preventDefault();
        const id = event.target.search__criteria.value
 
        axios
            .get(`http://localhost:8080/data/${id}`)
            .then(res => {
                this.setState({
                    isSearched: true,
                    searchedTrack: id,
                    returnedTracks: res.data,
              });
              
            });
    };


    render() {
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
                {
                    this.state.returnedTracks.map(track => {
                        return <TrackListItem key={track.listeners} artist={track.artist} name={track.name}/>
                    })



                }
                </div>
            </div>
        )
    }
}

export default TrackSearch