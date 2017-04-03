import React from 'react'
import { renderToString } from 'react-dom/server'
import Html from 'views/Html'
import createStore from 'stores/createStore'
import { Provider } from 'react-redux'
import { match, RouterContext, createMemoryHistory } from 'react-router'
import createRoute from './createRoute'
import { LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';

export default (req, res) => {

  const store = createStore(createMemoryHistory())

  match({ routes: createRoute(store), location: req.originalUrl }, (error, redirectLocation, renderProps) => {

    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      const component = (
        <Html store={store} component={
          <Provider store={store}>
            <LocaleProvider locale={enUS}>
              <RouterContext {...renderProps} />
            </LocaleProvider>
          </Provider>
        } />
      )

      store.sagaTask.done.then(() => {
        res.status(200).send('<!DOCTYPE HTML>\n' + renderToString(component))
      })

      const doRender = () => {
        renderToString(component)
        store.close()
      }

      doRender()
    } else {
      res.status(404).send('Not found')
    }
  })
}
