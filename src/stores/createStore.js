import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware, { END } from 'redux-saga';
import { routerMiddleware } from 'react-router-redux'

import reducers from 'reducers/index'
import rootSaga from 'sagas/index';

export default function (history, initialState = {}) {

  const sagaMiddleware = createSagaMiddleware();

  const middleware = [
    routerMiddleware(history)
  ];

  let devToolsExtension = f => f
  if (process.env.NODE_ENV === 'development' && process.env.client) {
    middleware.push(require('redux-logger')())
    if (window.devToolsExtension) devToolsExtension = window.devToolsExtension()
  }

  middleware.push(sagaMiddleware)

  const enhancer = compose(applyMiddleware(...middleware), devToolsExtension)

  const store = createStore(
    reducers,
    initialState,
    enhancer
  )

  store.sagaTask = sagaMiddleware.run(rootSaga);

  store.close = () => store.dispatch(END)

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers').default
      store.replaceReducer(nextReducer)
    })
  }

  return store
}
