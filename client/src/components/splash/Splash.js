import React, { Component } from 'react';
import axios from 'axios';
import uuidv1 from 'uuid/v1';

export class Splash extends Component {

    state = {
        isLoggedIn: false,
        loggedInUser: {
            _id: '',
            name: '',
            email: '',
            books: []
        },
    }

    componentDidMount() {

        const customerId = window.customerId;

        if (window.customerID) {
            axios.get(`https://serene-journey-89429.herokuapp.com/users/${customerId}`)
                .then(res => {
                this.setState({
                    loggedInUser: res.data,
                    isLoggedIn: true,
                });
            });
        }
    }

    onSubmitHandler = event => {
        event.preventDefault();
        
 
        this.setState({
            loggedInUser: {
            _id: uuidv1(),
            name: 'Guest',
            email: event.target.email__address.value,
            title: event.target.book__title.value,
            }
        }, () => {

        this.props.history.push({
         pathname: `${this.state.loggedInUser._id}/book/${uuidv1()}`,
         state: {loggedInUser: this.state.loggedInUser}
        })
        });
    };


    render() {
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
                    {this.state.isLoggedIn ? `User's Books will go here.` : 'Log in to see your Saved Books!'}
                </div>
            </div>
        )
    }
}

export default Splash
