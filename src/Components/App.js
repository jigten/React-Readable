import React, { Component } from 'react';
import Categories from './Categories'
import { Route } from 'react-router-dom'
import '../App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path="/" component={Categories} />
      </div>
    );
  }
}

export default App;
