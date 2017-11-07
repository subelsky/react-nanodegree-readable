import React from 'react'
import { Route } from 'react-router-dom'
import CategoryList from './CategoryList'
import PostList from './PostList'

const PostViewContainer = () => {
  return ([
    <Route path="/:category?" component={CategoryList} />,
    <Route path="/:category?" component={PostList} />
  ])
}

export default PostViewContainer
