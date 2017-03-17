import React from 'react'
import { renderToString } from 'react-dom/server'
import Html from './views/Html'
import createStore from './stores/createStore'
import { Provider } from 'react-redux'
import { match, RouterContext } from 'react-router'
import createRoute from './createRoute'

export default (req, res) => {

  const store = createStore()

  match({ routes: createRoute(store), location: req.originalUrl }, (error, redirectLocation, renderProps) => {

    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      const component = (
        <Provider store={store}>
          <RouterContext {...renderProps} />
        </Provider>
      )
      res.status(200).send('<!DOCTYPE HTML>\n' + renderToString(<Html store={store} component={component} />))
    } else {
      res.status(404).send('Not found')
    }
  })
}
