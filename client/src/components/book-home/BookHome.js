import React, { Component } from 'react'
import PagePreview from './PagePreview';
import uuidv1 from 'uuid/v1';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './BookHome.scss';

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
                    album: "",
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
        toast('Saving...');    
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
        const targetPage = this.state.activeBook.pages.find(page => page.id === id)
        this.setState({
            activePage: targetPage,
        }, () => {
            this.props.updateAppState(this.state)
            this.props.history.push({
                pathname: `/tools/${this.state.loggedInUser.id}/book/${this.state.activeBook.id}/page/${id}/editor`,
            })
        });
    }


    render() {
        return (
            <div className="bookhome">
                <div className="bookhome__information-wrapper">
                    <div className="bookhome__title-wrapper">
                <h1 className="bookhome__title">{this.state.activeBook.title}</h1>
                <p className="bookhome__author">{this.state.loggedInUser.name}</p>
                </div>
                <div className="bookhome__button-wrapper">
                <button onClick={this.onClickHandler} className="bookhome__button--add-page btn--secondary-accent"><img className="header--icon" src="https://cdn.shopify.com/s/files/1/0262/0584/7649/files/plus-circle.svg?58" alt="add-icon" />Add a Page</button>
                <button onClick={this.onSaveHandler} className="bookhome__button--save-book btn--secondary-accent"><img className="header--icon" src="https://cdn.shopify.com/s/files/1/0262/0584/7649/files/save.svg?58" alt="save-icon" />Save Book</button>
                </div>
                </div>
                <div className="bookhome__pages-wrapper">
                { this.state.activeBook.pages[0] ?
                    this.state.activeBook.pages.map(page => {
                                return <PagePreview onPagePreviewClick={this.onPagePreviewClick} key={page.id} id={page.id} track={page.track} pageNumber={page.pageNumber} albumArt={page.albumArt} artist={page.artist} album={page.album} thoughts={page.thoughts} pageContentUrl={page.pageContentUrl} />
                            }) :<h3 className="bookhome__no-pages-found">Add a page to get started.</h3>
                            }
                </div>
            </div>
        )
    }
}

export default BookHome
