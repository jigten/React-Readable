import React, { Component } from 'react';
import Index from './Index'
import Category from './Category'
import Post from './Post'
import PostNew from './PostNew'
import Header from './Header'
import { Route, Switch } from 'react-router-dom'
import '../App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route path="/" exact component={Index} />
          <Route path="/post/new" component={PostNew} />
          <Route path="/:category" exact component={Category} />
          <Route path="/:category/:post_id" component={Post} />
        </Switch>
      </div>
    );
  }
}

export default App;
