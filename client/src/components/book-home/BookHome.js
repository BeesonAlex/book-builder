import React, { Component } from 'react'
import PagePreview from './PagePreview';
import uuidv1 from 'uuid/v1';

export class BookHome extends Component {

    state = {
        ...this.props.appState
    }

    componentDidMount() {

        this.setState({
            ...this.props.appState
        })
    }

    onClickHandler = event => {
        event.preventDefault();

        this.setState({
                activePage: {
                    id: uuidv1(),
                    pageNumber: this.state.activeBook.pages.length + 1,
                    track: "",
                    albumArt: "",
                    artist: "",
                    thoughts: "",
                    pageContentUrl: "",
                },
        }, () => {
        this.props.updateAppState(this.state)
        this.props.history.push({
         pathname: `${this.props.match.params.bookid}/page/${this.state.activePage.id}/track-search`,
        })
        });
    };


    onSaveHandler = event => {
        event.preventDefault();

    const userBooks = this.state.loggedInUser.books;

    const targetBook = userBooks.findIndex(book => {
       return book.id === this.state.activeBook.id;
    });

    if (targetBook !== -1) {
        userBooks[targetBook] = this.state.activeBook;

    } else if (targetBook === -1) {
        userBooks.push(this.state.activeBook);
    }

    this.setState({
            loggedInUser: {
                id: this.state.loggedInUser.id,
                name: this.state.loggedInUser.name,
                email: this.state.loggedInUser.email,
                books: userBooks,
            }
    }, () => {
        this.props.saveUser(this.state.loggedInUser)
    });
    }

    onPagePreviewClick = (id) => {
        const targetPage = this.activeBook.pages.find(page => page.id === id)
        this.setState({
            activePage: targetPage,
        }, () => {
            this.props.history.push({
                pathname: `${this.state.loggedInUser.id}/book/${this.state.activeBook.id}/page/${id}/editor`,
            })
        });
    }


    render() {
        console.log(this.state)
        return (
            <div className="bookhome">
                <div className="bookhome__information-wrapper">
                <h1 className="bookhome__title">{this.state.activeBook.title}</h1>
                <p className="bookhome__author">{this.state.loggedInUser.name}</p>
                </div>
                <button onClick={this.onClickHandler} className="bookhome__button--add-page">Add a Page</button>
                <button onClick={this.onSaveHandler} className="bookhome__button--save-book">Save Book</button>
                <div className="bookhome__pages-wrapper">
                { this.state.activeBook.pages ?
                    this.state.activeBook.pages.map(page => {
                                return <PagePreview onPagePreviewClick={this.onPagePreviewClick} key={page.id} id={page.id} track={page.track} pageNumber={page.pageNumber} albumArt={page.albumArt} artist={page.artist} thoughts={page.thoughts} pageContentUrl={page.pageContentUrl} />
                            })
                            : ''
                            }
                </div>
            </div>
        )
    }
}

export default BookHome
