import React, { Component } from 'react'
// import { Link } from 'react-router-dom';

export class PagePreview extends Component {
    render() {
        return (
            <>
            <div className="pagepreview">
            <h3 className="pagepreview__song-title">{this.props.track}</h3>
            <p className="pagepreview__song-artist">{this.props.artist}</p>    
            <p className="pagepreview__page-number">{this.props.pageNumber}</p>
            {
                this.props.thoughts ?
                <p className="pagepreview__complete">completed!</p>
                : null    
            }    
            </div>
            </>
        )
    }
}

export default PagePreview
