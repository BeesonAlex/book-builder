import React, { Component } from 'react';
import uuidv1 from 'uuid/v1';
import BookPreview from './BookPreview';

export class Splash extends Component {

    state = {
        ...this.props.appState
        
    }

    componentDidMount() {

        this.setState({
            ...this.props.appState
        })
    }


    onSubmitHandler = event => {
        event.preventDefault();
        
        if (this.state.isLoggedIn) {

            this.setState({
                loggedInUser: {
                _id: this.state.loggedInUser._id,
                name: this.state.loggedInUser.name,
                email: this.state.loggedInUser.email,
                books: this.state.loggedInUser.books,
                },
                activeBook: {
                    _id: uuidv1(),
                    title: event.target.book__title.value,
                    contentUrl: null,
                    coverUrl: null,
                    pages: [],
                    },
                activePage: {}
            }, () => {
                this.props.updateAppState(this.state)
                this.props.history.push({
                 pathname: `${this.state.loggedInUser._id}/book/${this.state.activeBook._id}`,
                })
                });

        } else {

            this.setState({
                loggedInUser: {
                _id: uuidv1(),
                name: 'Guest',
                email: event.target.email__address.value,
                books: [],
                },
                activeBook: {
                    _id: uuidv1(),
                    title: event.target.book__title.value,
                    contentUrl: null,
                    coverUrl: null,
                    pages: [],
                    },
                activePage: {}
            }, () => {
            this.props.updateAppState(this.state)
            this.props.history.push({
             pathname: `${this.state.loggedInUser._id}/book/${this.state.activeBook._id}`,
            })
            });
        }
    };


    render() {
        console.log(this.state)
        return (
            <div className="splash">
                <div className="splash__content-header">
                    <h1 className="splash__title">Welcome to the Book Editor!</h1>
                    <form className="splash__form" onSubmit={this.onSubmitHandler}>
                        <input className="splash__form--email splash__form" type="text" name="email__address" placeholder="Enter an e-Mail"></input>
                        <input className="splash__form--email splash__form" type="text" name="book__title" placeholder="Enter a Title"></input>
                        <button className="splash__form--button submit-button" type="submit">Create New Book</button>
                    </form>
                </div>
                <div className="splash__user-books-wrapper">
                    {
                        this.state.loggedInUser.books > 0 ?  
                        this.state.loggedInUser.books.map(book => {
                            return <BookPreview key={book._id} id={book.id} title={book.title} pages={book.pages} numPages={book.pages.length} />
                        }) : 'Log in to see your Saved Books!'
                        }
                </div>
            </div>
        )
    }
}

export default Splash
