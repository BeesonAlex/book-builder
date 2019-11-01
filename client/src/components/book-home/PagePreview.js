import React, { Component } from 'react';

export class PagePreview extends Component {

    render() {
        return (
            <div className="pagepreview">
            <h3 className="pagepreview__song-title">{this.props.track}</h3>
            <p className="pagepreview__song-artist">{this.props.artist}</p>    
            <p className="pagepreview__page-number">{this.props.pageNumber}</p>
            <button onClick={() => this.props.onPagePreviewClick(this.id)} className="pagepreview__edit-button" id={this.props.id}>Edit</button>
            {
                this.props.thoughts ?
                <p className="pagepreview__complete">completed!</p>
                : ''    
            }    
            </div>
        )
    }
}

export default PagePreview
