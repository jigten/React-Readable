import React, { Component } from 'react';
import Index from './Index'
import Category from './Category'
import Post from './Post'
import PostNew from './PostNew'
import { Route } from 'react-router-dom'
import '../App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path="/" exact component={Index} />
        <Route path="/post/new" component={PostNew} />
        <Route path="/:category" exact component={Category} />
        <Route path="/:category/:post_id" component={Post} />
      </div>
    );
  }
}

export default App;
