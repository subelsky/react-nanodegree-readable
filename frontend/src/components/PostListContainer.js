import React from 'react'
import { Route } from 'react-router-dom'
import CategoryList from './CategoryList'
import PostList from './PostList'

const PostListContainer = () => {
  return ([
    <Route key='categoryList' path="/:category?" component={CategoryList} />,
    <Route key='postList' path="/:category?" component={PostList} />
  ])
}

export default PostListContainer
