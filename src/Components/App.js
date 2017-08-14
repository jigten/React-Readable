import React, { Component } from 'react';
import Index from './Index'
import Category from './Category'
import { Route } from 'react-router-dom'
import '../App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path="/" exact component={Index} />
        <Route path="/:category" component={Category} />
      </div>
    );
  }
}

export default App;
