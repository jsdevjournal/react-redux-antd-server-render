import React, { Component, PropTypes } from 'react'
import { renderToString } from 'react-dom/server'
import serialize from 'serialize-javascript'

/**
 * Wrapper components containing HTML metadata and boilerplate tags.
 * Used in server-side code only to wrap the string output of the
 * rendered routes components.
 *
 * The only thing this components doesn't (and can't) include is the
 * HTML doctype declaration, which is added to the rendered output
 * by the server.js file.
 */

export default class Html extends Component {

  static propTypes = {
    component: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired,
  }

  render() {
    const { store, component } = this.props
    const content = component ? renderToString(component) : ''
    return (
      <html lang="en-us">
        <head>
          <title>Title</title>
          <link rel="shortcut icon" href="/favicon.ico" />
          <link rel="stylesheet" href="/static/style.css" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        </head>
        <body>
          <div id="root" dangerouslySetInnerHTML={{__html: content}}/>
          <script id="initial-data" dangerouslySetInnerHTML={{__html: `window.__data=${serialize(store.getState())}`}} defer/>
          <script src="/static/bundle.js" defer/>
        </body>
      </html>
    )
  }
}
