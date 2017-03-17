import React, { Component } from 'react'
import createStore from './stores/createStore'
import { Provider } from 'react-redux'
import { applyRouterMiddleware, Router, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import createRoute from './createRoute'

const store = createStore(window.__data)
const history = syncHistoryWithStore(browserHistory, store)

export default class AppRoot extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router
          history={history} >
          {createRoute(store)}
        </Router>
      </Provider>
    )
  }
}
