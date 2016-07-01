import React from 'react'
import { createStore } from 'redux'
import ReactDOM from 'react-dom'
import ReactDOMServer from 'react-dom/server'
import { Provider, connect } from 'react-redux'
import r from 'r-dom'
import { div, h1, pre, ul } from 'r-dom'
import ContentEditable from 'react-contenteditable'
import node from './node'
import * as Action from '../actions.js'

const store = createStore(reducer)

function reducer(state, { type, data }) {
  switch (type) {
    default:
      return state
  }
}

function outline({ dispatch, data }) {
  const content = r(Provider, { store }, [
    ul([
      r(node, {
        data,
        root: data.root
      })
    ])
  ])

  return div([
    r(ContentEditable, {
      onChange: e => {
        dispatch(Action.outlineChange(e.target.value))
      },
      html: ReactDOMServer.renderToStaticMarkup(content)
    })
  ])
}

function mapStateToProps(state) {
  return state
}

export default connect(mapStateToProps)(outline)
