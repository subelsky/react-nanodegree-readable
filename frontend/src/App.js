import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import NavBar from './shared/NavBar'
import PostViewContainer from './components/PostViewContainer'
import PostListContainer from './components/PostListContainer'
import PostEditView from './components/PostEditView'
import CommentEditView from './components/CommentEditView'
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
            <Route path="/posts/:viewPostId/edit" component={PostEditView} />
            <Route path="/posts/:viewPostId" component={PostViewContainer} />
            <Route path="/comments/:editCommentId/edit" component={CommentEditView} />
            <Route component={PostListContainer} />
          </Switch>
        </main>
      ]
    );
  }
}

export default App
