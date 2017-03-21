import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { Router } from 'react-router'
import createRoute from 'createRoute'
import { LocaleProvider } from 'antd'
import enUS from 'antd/lib/locale-provider/en_US'


export default class AppRoot extends Component {

  render() {
    const { store, history } = this.props
    return (
      <Provider store={store}>
        <LocaleProvider locale={enUS}>
          <Router
            history={history} >
            {createRoute(store)}
          </Router>
        </LocaleProvider>
      </Provider>
    )
  }
}
