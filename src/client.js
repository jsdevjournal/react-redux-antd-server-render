import React from 'react'
import { render } from 'react-dom'
import AppRoot from './AppRoot'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import createStore from 'stores/createStore'
import 'antd/lib/style/v2-compatible-reset'

document.getElementById('initial-data').innerHTML = ''

const store = createStore(browserHistory, window.__data)
const history = syncHistoryWithStore(browserHistory, store)

render(
  <AppRoot store={store} history={history}/>,
  document.getElementById('root')
)

if (module.hot) {
  module.hot.accept()
}
