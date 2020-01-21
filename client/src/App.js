import React, { Component } from 'react'
import { Switch, BrowserRouter, Route } from "react-router-dom";
import Header from "./components/header/Header";
import Splash from "./components/splash/Splash";
import BookHome from "./components/book-home/BookHome";
import TrackSearch from "./components/track-search/TrackSearch";
import PageEditor from "./components/page-editor/PageEditor";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';


export class App extends Component {

  state = {
    isLoggedIn: false,
    loggedInUser: {
        id: '',
        name: '',
        email: '',
        books: [],
    },
    activeBook: {},
    activePage: {},
    isLoading: true,
}

// Component Did Mount - Check whether Logged In or Guest
componentDidMount() {

const shopifyUser = {
  shopifyEmail: window.customerEmail,
  shopifyFirstName: window.customerFirstName,
  shopifyLastName: window.customerLastName,
  shopifyId: window.customerId
}
console.log(shopifyUser)
// If the user is logged in, get their book-builder details, then ensure their database record is consistent with Shopify
  if (window.customerEmail) {
      axios.get(`https://serene-journey-89429.herokuapp.com/users/${shopifyUser.shopifyEmail}`)
          .then(res => {
            this.setState({
                loggedInUser: res.data,
                isLoggedIn: true,
                isLoading: false
            }, () => {
              axios
                .patch(`https://serene-journey-89429.herokuapp.com/users/${shopifyUser.shopifyEmail}`, {
                  id: shopifyUser.shopifyId,
                  name: `${shopifyUser.shopifyFirstName} ${shopifyUser.shopifyLastName}`,
                  email: shopifyUser.shopifyEmail,
                  numberOfBooks: this.state.loggedInUser.numberOfBooks,
                  books: this.state.loggedInUser.books,
              })
            });
            console.log(this.state)
          })
          .catch(err => {
            axios
              .post(`https://serene-journey-89429.herokuapp.com/users/`, {
                id: shopifyUser.shopifyId,
                name: `${shopifyUser.shopifyFirstName} ${shopifyUser.shopifyLastName}`,
                email: shopifyUser.shopifyEmail,
                numberOfBooks: '',
                books: []
              })
              .then(res => {
                this.setState({
                  loggedInUser: {
                    id: shopifyUser.shopifyId,
                    name: `${shopifyUser.shopifyFirstName} ${shopifyUser.shopifyLastName}`,
                    email: shopifyUser.shopifyEmail,
                    books: []
                  },
                  isLoggedIn: true,
                  isLoading: false,
                })
                console.log(this.state)
              })
              .catch(err => {
                console.log(err)
              })
          })
        } else {
          this.setState({
            isLoading: false,
          })
        }
};

// Function for Saving User
saveUser = (user) => {
  // get user - if they don't exist create one, if they do - update the user
      if (this.state.isLoggedIn === true) {
        axios
          .patch(`https://serene-journey-89429.herokuapp.com/users/${user.email}`, {
            id: user.id,
            name: user.name,
            email: user.email,
            numberOfBooks: user.numberOfBooks,
            books: user.books,
        })
        .then(res => {
          toast.success('Saved!')
        })
        .catch(err => {
          console.log(err);
        })

      } else if (this.state.isLoggedIn === false) {
        const newUser = {
          id: user.id,
          name: user.name,
          email: user.email,
          numberOfBooks: user.numberOfBooks,
          books: user.books,
        }

        axios
          .post(`https://serene-journey-89429.herokuapp.com/users/`, newUser)
          .then(res => {
            toast.success(`Saved. Welcome, ${newUser.name}!`)
            toast(`An account email has been sent to, ${newUser.email}.`)
            axios
              .post(`https://serene-journey-89429.herokuapp.com/shopify/storefront/customers`, {
                name: newUser.name,
                email: newUser.email,
              })
              .then(res => {
                
              })
              .catch(err => {
                console.log(err)
              })
          })
          .catch(err => {
            console.log(err);
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
    if (this.state.isLoading) {
      return '...loading'
    } else {
    return (
    <div className="App">
    <Header appState={this.state} saveUser={this.saveUser} updateAppState={this.updateAppState} />
    <BrowserRouter>
      <Switch>
      <Route path="/tools/book-builder/" exact render={(props) => <Splash {...props} appState={this.state} saveUser={this.saveUser} updateAppState={this.updateAppState} />} />
      <Route path="/tools/:userid/book/:bookid" exact render={(props) => <BookHome {...props} appState={this.state} saveUser={this.saveUser} updateAppState={this.updateAppState} />} />
      <Route path="/tools/:userid/book/:bookid/page/:pageid/track-search" exact render={(props) => <TrackSearch {...props} appState={this.state} saveUser={this.saveUser} updateAppState={this.updateAppState} />} />
      <Route path="/tools/:userid/book/:bookid/page/:pageid/editor" exact render={(props) => <PageEditor {...props} appState={this.state} saveUser={this.saveUser} updateAppState={this.updateAppState} />} />
      </Switch>
    </BrowserRouter>
    <ToastContainer hideProgressBar={true} />
    </div>
    )
    }
  }
}

export default App;