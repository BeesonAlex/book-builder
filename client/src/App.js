import React, { Component } from 'react'
import { Switch, BrowserRouter, Route } from "react-router-dom";
import Header from "./components/header/Header";
import Splash from "./components/splash/Splash";
import BookHome from "./components/book-home/BookHome";
import TrackSearch from "./components/track-search/TrackSearch";
import PageEditor from "./components/page-editor/PageEditor";
import axios from 'axios';
import './App.css';

export class App extends Component {

  state = {
    isLoggedIn: false,
    loggedInUser: {
        _id: '',
        name: '',
        email: '',
        books: [],
    },
    activeBook: {},
    activePage: {}
}

// Component Did Mount - Check whether Logged In or Guest
componentDidMount() {

const customerId = window.customerId;

  if (window.customerId) {
      axios.get(`https://serene-journey-89429.herokuapp.com/users/${customerId}`)
          .then(res => {
          this.setState({
              loggedInUser: res.data,
              isLoggedIn: true,
          });
      });
  }
};


// Function for Saving User
saveUser = (user) => {
  // get user - if they don't exist create one, if they do - update the user
      if (window.customerId) {

        axios
          .patch(`https://serene-journey-89429.herokuapp.com/users/${user._id}`, {
            
            _id: user._id,
            name: user.name,
            email: user.email,
            numberOfBooks: user.numberOfBooks,
            books: user.books,
        })

      } else if (!window.customerId) {

        axios
          .post(`https://serene-journey-89429.herokuapp.com/users/`, {
            _id: user._id,
            name: user.name,
            email: user.email,
            numberOfBooks: user.numberOfBooks,
            books: user.books,
        })
      }


}



// Function for Saving State at the App Level
updateAppState = (componentState) => {

  this.setState({
    ...componentState
  })
}


  render() {
    console.log(window.customerId)
    return (
    <div className="App">
    <Header appState={this.state} />
    <BrowserRouter>
      <Switch>
      <Route path="/" exact render={(props) => <Splash {...props} appState={this.state} saveUser={this.saveUser} updateAppState={this.updateAppState} />} />
      <Route path="/:userid/book/:bookid" exact render={(props) => <BookHome {...props} appState={this.state} saveUser={this.saveUser} updateAppState={this.updateAppState} />} />
      <Route path="/:userid/book/:bookid/page/:pageid/track-search" exact render={(props) => <TrackSearch {...props} appState={this.state} saveUser={this.saveUser} updateAppState={this.updateAppState} />} />
      <Route path="/:userid/book/:bookid/page/:pageid/editor" exact render={(props) => <PageEditor {...props} appState={this.state} saveUser={this.saveUser} updateAppState={this.updateAppState} />} />
      </Switch>
    </BrowserRouter>
    </div>
    )
  }
}

export default App;