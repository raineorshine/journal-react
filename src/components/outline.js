import React from 'react'
import { createStore } from 'redux'
import ReactDOM from 'react-dom'
import ReactDOMServer from 'react-dom/server'
import { Provider, connect } from 'react-redux'
import r from 'r-dom'
import { div, ul, span } from 'r-dom'
import ContentEditable from 'react-contenteditable'
import node from './node'
import merge from 'lodash.merge'
import * as Action from '../actions.js'

const Outline = store => {

  function outline({ dispatch, db }) {
    const content = r(Provider, { store }, [
      ul([
        r(node, {
          db,
          root: db.root
        })
      ])
    ])

    return div([
      span([ Math.floor(Math.random() * 10000) ]),
      r(ContentEditable, {
        onChange: e => {
          dispatch(Action.outlineChange(e.target.value))
        },
        html: ReactDOMServer.renderToStaticMarkup(content)
      })
    ])
  }

  function mapStateToProps(state) {
    return merge({}, {
      db: state
    })
  }

  return connect(mapStateToProps)(outline)
}

export default Outline
