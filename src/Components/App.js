import React, { Component } from 'react';
import Index from './Index'
import Category from './Category'
import Post from './Post'
import PostNew from './PostNew'
import PostEdit from './EditPost'
import CommentEdit from './EditComment'
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
          <Route path="/post/new" exact component={PostNew} />
          <Route path="/:category" exact component={Category} />
          <Route path="/:category/:post_id" exact component={Post} />
          <Route path="/:category/:post_id/edit" component={PostEdit} />
          <Route path="/:category/:post_id/comments/:comment_id/edit" component={CommentEdit} />
        </Switch>
      </div>
    );
  }
}

export default App;
