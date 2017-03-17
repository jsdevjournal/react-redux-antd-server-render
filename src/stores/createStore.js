import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import reducers from '../reducers'

export default function (initialState = {}) {

  const store = createStore(
    combineReducers({
      ...reducers,
      routing: routerReducer
    }),
    initialState
  )

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers').default
      store.replaceReducer(nextReducer)
    })
  }

  return store
}
