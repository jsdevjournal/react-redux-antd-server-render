import React from 'react'
import { render } from 'react-dom'
import AppRoot from './AppRoot'

document.getElementById('initial-data').innerHTML = ''

render(
  <AppRoot />,
  document.getElementById('root')
)

if (module.hot) {
  module.hot.accept()
}
