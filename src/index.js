import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import r from 'r-dom'
import Outline from './components/outline'
import data from './data/demo.js'

const store = createStore(reducer)

function reducer(state, { type, data }) {
  switch (type) {
    default:
      return state
  }
}

ReactDOM.render(
  r(Provider, { store }, [
    r(Outline, { data }),
  ]),
  document.getElementById('app')
)
