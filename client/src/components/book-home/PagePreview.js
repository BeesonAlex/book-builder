import React, { Component } from 'react';
import './BookHome.scss';

export class PagePreview extends Component {

    render() {
        return (
            <div className="pagepreview">
            <h3 className="pagepreview__song-title">{this.props.track}</h3>
            <p className="pagepreview__song-artist">{this.props.artist}</p>    
            <p className="pagepreview__page-number">{this.props.pageNumber}</p>
            <button onClick={() => this.props.onPagePreviewClick(this.props.id)} className="pagepreview__edit-button" id={this.props.id}><img className="icon" src="../../assets/icons/edit.svg" />Edit</button>
            {
                this.props.thoughts ?
                <img className="pagepreview__complete" src="../../assets/icons/check-circle.svg" />
                : <img className="pagepreview__incomplete" src="../../assets/icons/circle.svg" />    
            }    
            </div>
        )
    }
}

export default PagePreview
