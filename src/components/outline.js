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

class Outline extends React.Component {

  componentDidMount() {
    const mo = new MutationObserver(mutations => {
      console.log(mutations)
    })
    mo.observe(this.refs.outline, { characterData: true, subtree: true })
  }

  render() {
    return div([
      span([ Math.floor(Math.random() * 10000) ]),
      div({
        contentEditable: true,
        ref: 'outline',
        onInput: e => {
          // replace with MutationRecord
          this.props.dispatch(Action.outlineChange(e.target.value))
        },
      }, [
        ul([
          r(node, this.props.db.root)
        ])
      ])
    ])
  }
}

function mapStateToProps(state) {
  return state
}

export default connect(mapStateToProps)(Outline)
