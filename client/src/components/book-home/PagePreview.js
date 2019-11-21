import React, { Component } from 'react';
import './BookHome.scss';

export class PagePreview extends Component {

    render() {
        return (
            <div className="pagepreview">
            <p className="pagepreview__page-number">{this.props.pageNumber}</p>
            <h3 className="pagepreview__song-title">{this.props.track}</h3>
            <h3 className="pagepreview__song-artist">{this.props.artist}</h3>    
            {
                this.props.thoughts ?
                <div className="pagepreview__completion-status"><img className="pagepreview__complete" src="https://cdn.shopify.com/s/files/1/0262/0584/7649/files/check-circle.svg?58" alt="circle-icon" /><p className="pagepreview__completion-text">Complete</p></div>
                : <div className="pagepreview__completion-status"><img className="pagepreview__incomplete" src="https://cdn.shopify.com/s/files/1/0262/0584/7649/files/circle.svg?58" alt="checked-icon" /><p className="pagepreview__completion-text">Incomplete</p></div>    
            }    
            <button onClick={() => this.props.onPagePreviewClick(this.props.id)} className="pagepreview__edit-button btn--secondary-accent" id={this.props.id}><img className="icon" src="https://cdn.shopify.com/s/files/1/0262/0584/7649/files/edit.svg?58" alt="edit-icon" />Edit</button>
            </div>
        )
    }
}

export default PagePreview
