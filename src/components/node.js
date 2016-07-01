import { connect } from 'react-redux'
import { ul, li, sup, span } from 'r-dom'

function handleInput() {
  console.log('hi')
}

function node({ data, root: { id, value, parents, children } }) {
  return li({
    id: id === 'root' ? 'root' : null,
    'data-id': id,
    onInput: handleInput
  }, [
    span({ className: 'content' }, [value]),
    sup([ Math.floor(Math.random() * 10000) ]),
    children ? ul(children.map(child => node({
      data,
      root: data[child]
    }))) : ''
  ])
}

function mapStateToProps(state) {
  return state || {}
}

export default connect(mapStateToProps)(node)
