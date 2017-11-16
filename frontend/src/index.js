import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import './bootstrap.min.css'
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux'
import configureStore from './store/ConfigureStore';
import { postsFetchData } from './actions/posts'
import { commentsFetchData } from './actions/comments'
import { categoriesFetchData } from './actions/categories'

const store = configureStore()
store.dispatch(postsFetchData())
store.dispatch(commentsFetchData())
store.dispatch(categoriesFetchData())

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
)

registerServiceWorker();
