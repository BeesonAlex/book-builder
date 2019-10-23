import React from 'react';
import { Switch, BrowserRouter, Route } from "react-router-dom";
import Header from "./components/header/Header";
import BookNavigation from "./components/book-navigation/BookNavigation";
import Splash from "./components/splash/Splash";
import BookHome from "./components/book-home/BookHome";
import TrackSearch from "./components/track-search/TrackSearch";
import PageEditor from "./components/page-editor/PageEditor";

import './App.css';

function App() {
  return (
    <div className="App">
     <BrowserRouter>
     <Switch>
       <Route path="/" exact component={Header} />
       <Route path="/:userid" component={BookNavigation} />
    </Switch> 
    </BrowserRouter>
    <BrowserRouter>
      <Switch>
      <Route path="/" exact component={Splash} />
      <Route path="/:userid/book/:bookid" exact component={BookHome} />
      <Route path="/:userid/book/:bookid/page/:pageid/track-search" exact component={TrackSearch} />
      <Route path="/:userid/book/:bookid/page/:pageid/editor" exact component={PageEditor} />
      </Switch>
    </BrowserRouter>
    </div>
  );
}

export default App;
