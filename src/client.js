import React from 'react'
import { render } from 'react-dom'
import AppRoot from './AppRoot'

render(
  <AppRoot />,
  document.getElementById('root')
)

if (module.hot) {
  module.hot.accept()
}
