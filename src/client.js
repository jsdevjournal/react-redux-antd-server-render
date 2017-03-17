import React from 'react'
import { Router, browserHistory } from 'react-router'
import { render } from 'react-dom'
import createStore from './stores/createStore'
import createRoute from './createRoute'
import { Provider } from 'react-redux'

const store = createStore(window.__data)

render(
  <Provider store={store}>
    <Router
      history={browserHistory} >
      {createRoute(store)}
    </Router>
  </Provider>,
  document.getElementById('root')
)
