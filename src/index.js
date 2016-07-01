import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import r from 'r-dom'
import Outline from './components/outline'
import data from './data/demo.js'
import merge from 'lodash.merge'
import { render } from 'react-dom'
import { v4 as uuid } from 'uuid'

const log = (...args) => {
  console.log(...args)
  return args[args.length-1]
}

const store = createStore(reducer)

store.dispatch({ type: 'INIT', data })

// setInterval(() => {
//   store.dispatch({ type: 'TICK', data: {
//     root: {
//       id: 'root',
//       parents: [],
//       children: ['content']
//     },
//     content: {
//       id: 'content',
//       value: 'Content',
//       parents: ['root'],
//       children: []
//     }
//   }})
// }, 500)

/** Flatten a tree into an array. */
function flattenTree(root) {
  return [root].concat(...root.children.map(flattenTree))
}

/** Takes a lightweight outline (a snapshot of the DOM) which could have multiple edits, due to multiline delete or paste. Returns an updated state based on the output of the edit. */
function updateOutline(state, tree) {

  const nodes = flattenTree(tree)
  return nodes.reduce((prevState, node, i) => {
    const prev = nodes[i-1]
    let newDbNode

    // new node (has same id as previous node due to contenteditable list)
    if(prev && node.id === prev.id) {
      const id = uuid()
      newDbNode = {
        // add the new node
        [id]: {
          id,
          value: node.value,
          parents: [node.parent]
        },
        // add the new node as a child of its parent
        [node.parent]: merge({}, prevState[node.parent], {
          children: prevState[node.parent].children.concat(id)
        })
      }
    }
    // existing node
    else {
      newDbNode = {
        [node.id]: merge({}, prevState[node.id], {
          value: node.value
        })
      }
    }

    // merge the new database node into the previous state
    return merge({}, prevState, newDbNode)
  }, state)
}

function reducer(state, { type, data }) {
  switch (type) {
    case 'INIT':
      return data
    case 'TICK':
      return data
    case 'OUTLINE_CHANGE':
      log(updateOutline(state, data))
      return state
    default:
      return state
  }
}

render(
  r(Provider, { store }, [
    r(Outline, { data }),
  ]),
  document.getElementById('app')
)
