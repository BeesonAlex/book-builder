import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export class PagePreview extends Component {
    render() {
        return (
            <Link to={this.props.uid}>
            <div className="pagepreview">
            <h3 className="pagepreview__song-title">{this.props.title}</h3>
            <p className="pagepreview__song-artist">{this.props.artist}</p>    
            <p className="pagepreview__complete">{this.props.isComplete}</p>    
            </div>
            </Link>
        )
    }
}

export default PagePreview
