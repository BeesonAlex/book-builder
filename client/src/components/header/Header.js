import React, { Component } from 'react'
import axios from 'axios'

export class Header extends Component {

    state= {
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
                    const bookResponse = res.data.bookResponse
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
                    <h1 className="header__title">Book Builder</h1>
                </div>
                <div className="header__right-wrapper">
                {
                    this.state.activeBook.id ? <button onClick={this.onCompleteHandler} className="header__submit-button">Complete Book</button> : ''
                }
                </div>
            </div>
        )
    }

}

export default Header
