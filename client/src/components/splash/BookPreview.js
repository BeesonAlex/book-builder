import React, { Component } from 'react';
// import { Link } from 'react-router-dom';

export class BookPreview extends Component {

onClickHandler = (event) => {

}

    render() {
        return (
            <div className="bookpreview__wrapper" onclick={this.onClickHandler}>
                <h3 className="bookpreview__title">{this.props.title}</h3>
                <p className="bookpreview__pages">{this.props.numPage}</p>
            </div>
        )
    }
}

export default BookPreview
