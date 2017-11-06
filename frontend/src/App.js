import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import NavBar from './shared/NavBar'
import CategoryList from './components/CategoryList'
import PostList from './components/PostList'
import './App.css'

class App extends Component {
  state = {
    category: null
  }

  render() {
    return (
      [
        <NavBar key='navbar'></NavBar>,

        <main key='main' role="main" className="container-fluid">
          <Route path="/:category?" component={CategoryList} />
          <Route path="/:category?" component={PostList} />
        </main>
      ]
    );
  }
}

export default App
