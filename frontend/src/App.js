import React, { Component } from 'react';
import NavBar from './shared/NavBar'
import CategoryList from './components/CategoryList'
import './App.css';

class App extends Component {
  componentDidMount() {
  }

  render() {
    return (
      [<NavBar key='navbar'></NavBar>,
       <main key='main' role="main" className="container">
        <CategoryList />
      </main>]
    );
  }
}

export default App
