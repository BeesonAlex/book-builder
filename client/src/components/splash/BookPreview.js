import React, { Component } from 'react';
import './Splash.scss';

export class BookPreview extends Component {

    render() {
        return (
            <div className="bookpreview__wrapper">
                <img className="bookpreview__icon" src="https://cdn.shopify.com/s/files/1/0262/0584/7649/files/book.svg?65" alt="closed-book-icon" />
                <h3 className="bookpreview__title">{this.props.title}</h3>
                <p className="bookpreview__pages">{this.props.numPage}</p>
                <button className="bookpreview__edit-button btn--secondary-accent" id={this.props.id} onClick={() => this.props.onBookPreviewClick(this.props.id)}><img className="bookpreview__icon" src="https://cdn.shopify.com/s/files/1/0262/0584/7649/files/edit.svg?72" alt="edit-icon" />Edit</button>
            </div>
        )
    }
}

export default BookPreview
