import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import createSaga from 'redux-saga';

import reducers from 'reducers/index'
import sagas from 'sagas/index';

export default function (initialState = {}) {

  const saga = createSaga();

  const middleware = [
    saga
  ];

  let devToolsExtension = f => f
  if (process.env.NODE_ENV === 'development' && process.env.client) {
    middleware.push(require('redux-logger')())
    if (window.devToolsExtension) devToolsExtension = window.devToolsExtension()
  }

  const enhancer = compose(applyMiddleware(...middleware), devToolsExtension)

  const store = createStore(
    combineReducers({
      ...reducers,
      routing: routerReducer
    }),
    initialState,
    enhancer
  )

  saga.run(sagas)

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers').default
      store.replaceReducer(nextReducer)
    })
  }

  return store
}
