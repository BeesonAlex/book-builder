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

    checkBookSaveStatus = () => {
        const targetBook = this.state.loggedInUser.find(book => {
            return book.id === this.state.activeBook.id
        })

        if (JSON.stringify(targetBook) === JSON.stringify(this.state.activeBook)) {
            return true
        } else if (JSON.stringify(targetBook) !== JSON.stringify(this.state.activeBook)) {
            return false
        } else {
            return null
        }
    }

    onCompleteHandler = () => {

        if (this.checkBookSaveStatus() === true ) {

            const userBooks = this.state.loggedInUser.books;

            const targetBook = userBooks.findIndex(book => {
               return book.id === this.state.activeBook.id;
            });
        
            if (targetBook !== -1) {
                userBooks[targetBook] = this.state.activeBook;
        
            } else if (targetBook === -1) {
                userBooks.push(this.state.activeBook);
            }

        axios
            .post(`https://serene-journey-89429.herokuapp.com/pdf/`, this.state.activeBook)
            .then(res => {
                this.setState({
                    activeBook: {
                        id: this.state.activeBook.id,
                        title: this.state.activeBook.title,
                        contentUrl: res.data,
                        coverUrl: this.state.activeBook.coverUrl,
                        pages: this.state.activeBook.pages
                    },
                    loggedInUser: {
                        id: this.state.loggedInUser.id,
                        name: this.state.loggedInUser.name,
                        email: this.state.loggedInUser.email,
                        books: userBooks,
                    }
                }, () => {
                    this.props.saveUser(this.state.loggedInUser)

                    axios
                        .post(`https://serene-journey-89429.herokuapp.com/cart/`, this.state.activeBook)
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

        } else {
            alert('Please save your book before continuing')
        }
    }

    render() {
        return (
            <div className="header">
                <div className="header__left-wrapper">
                    <h1 className="header__title">Book Builder</h1>
                </div>
                <div className="header__right-wrapper">
                {    
                    this.checkBookSaveStatus() ? <p className="header__save-status">Book Saved</p> : <p className="header__save-status">Unsaved Changes</p>
                }
                {
                    this.state.activeBook ? <button onClick={this.onCompleteHandler} className="header__submit-button">Complete Book</button> : ''
                }
                </div>
            </div>
        )
    }

}

export default Header
