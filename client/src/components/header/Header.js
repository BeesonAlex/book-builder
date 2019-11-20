import React, { Component } from 'react';
import axios from 'axios';
import './Header.scss';

export class Header extends Component {

    state={
        ...this.props.appState
    }

    componentDidMount() {
        this.setState({
            ...this.props.appState
        })
    }

    onCompleteHandler = () => {
        this.setState({
            ...this.props.appState
        }, () => {
            axios
                .post(`https://serene-journey-89429.herokuapp.com/pdf/`, this.state.activeBook)
                .then(res => {
                    const bookResponse = res.data
                    console.log(res.data.bookResponse)
                    console.log(res.data)
                    this.setState({
                        activeBook: {
                            id: this.state.activeBook.id,
                            title: this.state.activeBook.title,
                            contentUrl: bookResponse,
                            coverUrl: 'https://drive.google.com/file/d/19SrfpNdKh9huLoABWeLYpC2PXyjs9Hj-/view?usp=sharing',
                            pages: this.state.activeBook.pages
                        }
                    }, () => {
                        console.log(this.state)
                        axios
                            .post(`/cart/add.js`, {
                                quantity: 1,
                                id: 31160253481057,
                                properties: {
                                  title: this.state.activeBook.title,
                                  contentUrl: bookResponse,
                                  coverUrl: 'https://drive.google.com/file/d/19SrfpNdKh9huLoABWeLYpC2PXyjs9Hj-/view?usp=sharing',
                                  author: this.state.loggedInUser.name,
                                  email: this.state.loggedInUser.email
                                }
                            })
                            .then(res => {
                                this.props.history.push(`/cart`)
                                console.log(res.data)
                            })
                            .catch(err => {
                                console.log(err)
                            })
                    })
                })
                .catch(err => {
                    console.log(err)
                })
        })
    }

onHomeHandler = () => {
    this.props.history.push(`/tools/book-builder`)
    }

    static getDerivedStateFromProps(props, state) {
        // Any time the current user, page or book changes, re-spread appstate to this.state
        if (props.appState.activeBook.id !== state.activeBook.id || props.appState.activePage.id !== state.activePage.id || props.appState.loggedInUser.id !== state.loggedInUser.id) {
          return {
            ...props.appState
          };
        }
        return null;
      }

    render() {
        console.log(this.state)
        return (
            <div className="header">
                <div className="header__left-wrapper">
                    <img className="header__icon" src="https://cdn.shopify.com/s/files/1/0262/0584/7649/files/book-open.svg?72" />
                <h2 className="header__title"></h2>
                </div>
                <div className="header__right-wrapper">
                <button onClick={this.onHomeHandler} className="header__button btn"><img className="header__complete-icon" src="https://cdn.shopify.com/s/files/1/0262/0584/7649/files/home.svg?67"/>Home</button>
                {
                    this.state.activeBook.id ? <button onClick={this.onCompleteHandler} className="header__button btn"><img className="header__complete-icon" src="https://cdn.shopify.com/s/files/1/0262/0584/7649/files/shopping-cart.svg?67"/>Complete Book</button> : ''
                }
                </div>
            </div>
        )
    }

}

export default Header
