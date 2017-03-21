import React from 'react'
import { render } from 'react-dom'
import AppRoot from './AppRoot'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import createStore from 'stores/createStore'

document.getElementById('initial-data').innerHTML = ''

const store = createStore(window.__data)
const history = syncHistoryWithStore(browserHistory, store)

render(
  <AppRoot store={store} history={history}/>,
  document.getElementById('root')
)

if (module.hot) {
  module.hot.accept()
}
