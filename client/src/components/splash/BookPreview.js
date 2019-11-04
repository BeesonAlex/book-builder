import React, { Component } from 'react';

export class BookPreview extends Component {

    render() {
        return (
            <div className="bookpreview__wrapper">
                <h3 className="bookpreview__title">{this.props.title}</h3>
                <p className="bookpreview__pages">{this.props.numPage}</p>
                <button className="bookpreview__edit-button" id={this.props.id} onClick={() => this.props.onBookPreviewClick(this.props.id)}>Edit</button>
            </div>
        )
    }
}

export default BookPreview
