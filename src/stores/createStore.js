import { createStore, applyMiddleware, compose } from 'redux'
import reducer from '../reducers'

export default function (initialState = {}) {

  const store = createStore(reducer, initialState)

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers').default
      store.replaceReducer(nextReducer)
    })
  }

  return store
}
