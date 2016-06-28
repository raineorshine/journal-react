import { connect } from 'react-redux'
import { ul, li } from 'r-dom'

function node({ data, root: { id, value, parents, children } }) {
  return li([
    value,
    children ? ul(children.map(child => node({
      data,
      root: data[child]
    }))) : ''
  ])
}

function mapStateToProps(state) {
  return state
}

export default connect(mapStateToProps)(node)
