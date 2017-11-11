import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import NavBar from './shared/NavBar'
import PostViewContainer from './components/PostViewContainer'
import PostListContainer from './components/PostListContainer'
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
          <Switch>
            <Route path="/posts/:viewPostId" component={PostListContainer} />
            <Route component={PostViewContainer} />
          </Switch>
        </main>
      ]
    );
  }
}

export default App
