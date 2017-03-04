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

function outline({ db, dispatch }) {

  return div([
    span([ Math.floor(Math.random() * 10000) ]),
    div({
      contentEditable: true,
      onInput: e => {
        // replace with MutationRecord
        dispatch(Action.outlineChange(e.target.value))
      },
    }, [
      ul([
        r(node, db.root)
      ])
    ])
  ])
}

function mapStateToProps(state) {
  return state
}

export default connect(mapStateToProps)(outline)
