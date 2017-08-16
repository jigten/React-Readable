import React, { Component } from 'react';
import Index from './Index'
import Category from './Category'
import Post from './Post'
import { Route } from 'react-router-dom'
import '../App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path="/" exact component={Index} />
        <Route path="/:category" exact component={Category} />
        <Route path="/:category/:post_id" component={Post} />
      </div>
    );
  }
}

export default App;
