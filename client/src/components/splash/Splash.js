import React, { Component } from 'react';
import uuidv1 from 'uuid/v1';
import BookPreview from './BookPreview';
import './Splash.scss';

export class Splash extends Component {

    state = {
        ...this.props.appState,
    }

    componentDidMount() {

        this.setState({
            ...this.props.appState,
        })
    }


    onSubmitHandler = event => {
        event.preventDefault();
        
        if (this.state.isLoggedIn) {

            this.setState({
                loggedInUser: {
                id: this.state.loggedInUser.id,
                name: this.state.loggedInUser.name,
                email: this.state.loggedInUser.email,
                books: this.state.loggedInUser.books,
                },
                activeBook: {
                    id: uuidv1(),
                    title: event.target.book__title.value,
                    contentUrl: '',
                    coverUrl: '',
                    pages: [],
                    },
                activePage: {}
            }, () => {
                this.props.updateAppState(this.state)
                this.props.history.push({
                 pathname: `${this.state.loggedInUser.id}/book/${this.state.activeBook.id}`,
                })
                });

        } else {

            this.setState({
                loggedInUser: {
                id: uuidv1(),
                name: event.target.name.value,
                email: event.target.email__address.value,
                books: [],
                },
                activeBook: {
                    id: uuidv1(),
                    title: event.target.book__title.value,
                    contentUrl: '',
                    coverUrl: '',
                    pages: [],
                    },
                activePage: {}
            }, () => {
            this.props.updateAppState(this.state)
            this.props.history.push({
             pathname: `${this.state.loggedInUser.id}/book/${this.state.activeBook.id}`,
            })
            });
        }
    };

    onBookPreviewClick = (id) => {
        const targetBook = this.state.loggedInUser.books.find(book => book.id === id)
        this.setState({
            activeBook: targetBook,
        }, () => {
            this.props.updateAppState(this.state)
            this.props.history.push({
                pathname: `${this.state.loggedInUser.id}/book/${id}`,
            })
        });
    }


    render() {
        return (
            <div className="splash">
                <div className="splash__content-header">
                    <h3 className="splash__title">Welcome to the Book Editor</h3>
                    {
                        this.state.isLoggedIn ? (
                        <form className="splash__form" onSubmit={this.onSubmitHandler}>
                        <input className="splash__form--email splash__form__input" type="text" name="book__title" placeholder="Enter a Title"></input>
                        <button className="splash__form--button submit-button btn" type="submit"><img className="add--icon" src="https://cdn.shopify.com/s/files/1/0262/0584/7649/files/plus-circle.svg?58" alt="add-icon" />Create New Book</button>
                        </form>
                    ) : (
                    <form className="splash__form" onSubmit={this.onSubmitHandler}>
                        <input className="splash__form--email splash__form__input" type="text" name="email__address" placeholder="Enter an e-Mail"></input>
                        <input className="splash__form--email splash__form__input" type="text" name="name" placeholder="Enter Your Name"></input>
                        <input className="splash__form--email splash__form__input" type="text" name="book__title" placeholder="Enter a Title"></input>
                        <button className="splash__form--button submit-button btn" type="submit"><img className="add--icon" src="https://cdn.shopify.com/s/files/1/0262/0584/7649/files/plus-circle.svg?58" alt="add-icon" />Create Your First Book</button>
                    </form>
                    )}
                </div>
                <div className="splash__user-books-wrapper">
                    <p className="splash__user-books-wrapper__subtitle">Your Saved Books:</p>
                    {
                        this.state.isLoggedIn ?  
                        this.state.loggedInUser.books.map(book => {
                            return <BookPreview key={book.id} id={book.id} title={book.title} pages={book.pages} onBookPreviewClick={this.onBookPreviewClick} numPages={book.pages.length} />
                        }) : <h3 className="splash__no-saved-books">No saved books yet!</h3>
                        }
                </div>
            </div>
        )
    }
}

export default Splash
