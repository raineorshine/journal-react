import React from 'react'
import { createStore } from 'redux'
import ReactDOM from 'react-dom'
import ReactDOMServer from 'react-dom/server'
import { Provider, connect } from 'react-redux'
import r from 'r-dom'
import { div, h1, pre, ul } from 'r-dom'
import ContentEditable from 'react-contenteditable'
import node from './node'

const store = createStore(reducer)

function reducer(state, { type, data }) {
  switch (type) {
    default:
      return state
  }
}

function outline({ data }) {
  const content = r(Provider, { store }, [
    ul([
      r(node, {
        data,
        root: data.root
      })
    ])
  ])

  return div([
    r(ContentEditable, { html: ReactDOMServer.renderToString(content) })
  ])
}

function mapStateToProps(state) {
  return state
}

export default connect(mapStateToProps)(outline)