import React, { Component } from 'react';
import './Splash.scss';

export class BookPreview extends Component {

    render() {
        return (
            <div className="bookpreview__wrapper">
                <img className="bookpreview__icon" src="../../assets/book.svg" />
                <h3 className="bookpreview__title">{this.props.title}</h3>
                <p className="bookpreview__pages">{this.props.numPage}</p>
                <button className="bookpreview__edit-button btn--secondary" id={this.props.id} onClick={() => this.props.onBookPreviewClick(this.props.id)}>Edit</button>
            </div>
        )
    }
}

export default BookPreview
