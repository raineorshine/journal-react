import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import r from 'r-dom'
import Outline from './components/outline'
import db from './data/demo.js'
import merge from 'lodash.merge'
import { render } from 'react-dom'
import { v4 as uuid } from 'uuid'

const log = (...args) => {
  console.log(...args)
  return args[args.length-1]
}

const insert = (array, beforeIndex, newItem) => {
  return [
    ...array.slice(0, beforeIndex),
    newItem,
    ...array.slice(beforeIndex)
  ]
}

const store = createStore(reducer)

store.dispatch({ type: 'INIT', data: db })

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
    let nodesToMerge

    // new node (has same id as previous node due to contenteditable list)
    if(prev && node.id === prev.id) {
      const id = uuid()
      const siblings = prevState[node.parent].children
      const newIndex = siblings.indexOf(node.id) + 1
      nodesToMerge = {
        // add the new node
        [id]: {
          id,
          value: node.value,
          parents: [node.parent]
        },
        // add the new node as a child of its parent
        [node.parent]: merge({}, prevState[node.parent], {
          children: insert(siblings, newIndex, id)
        })
      }
    }
    // existing node
    else {
      nodesToMerge = {
        [node.id]: merge({}, prevState[node.id], {
          value: node.value
        })
      }
    }

    // merge the new database node into the previous state
    return merge({}, prevState, nodesToMerge)
  }, state)
}

function reducer(state, { type, data }) {
  switch (type) {
    case 'INIT':
      return data
    case 'TICK':
      return data
    case 'OUTLINE_CHANGE':
      return updateOutline(state, data)
    default:
      return state
  }
}

render(
  r(Provider, { store }, [
    r(Outline(store), { db }),
  ]),
  document.getElementById('app')
)
