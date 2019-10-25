import React, { Component } from 'react'

export class BookNavigation extends Component {
    render() {
        return (
            <div className="header">
                <div className="header__left-wrapper">
                    <h1 className="header__title">Book Home</h1>
                </div>
                <div className="header__mid-wrapper">
                    <p className="header__left-button">Previous</p>
                    <p className="header__page-number">{this.state.loggedInUser.activePage.pageNumber}</p>
                    <p className="header__right-button">Next</p>
                </div>
                <div className="header__right-wrapper">
                    <button className="header__button--save">Save</button>
                    <button className="header__button--submit">Save and Submit</button>
                </div>
            </div>
        )
    }
}

export default BookNavigation
