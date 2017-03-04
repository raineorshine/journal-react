import r from 'r-dom'
import { connect } from 'react-redux'
import { ul, li, sup, span } from 'r-dom'

function node({ id, value, parents, children }) {
  return li({
    id: id === 'root' ? 'root' : null,
    'data-id': id
  }, [
    span({ className: 'content' }, [Math.floor(Math.random() * 10000) + (value || '')]),
    children ? ul(children.map(child => r(connectedNode, {
      // set the id prop of the child node so that the state gets sliced correctly on render
      id: child
    }))) : ''
  ])
}

function mapStateToProps({ db }, ownProps) {
  // select the node from the db with the correct id
  return db[ownProps.id]
}

const connectedNode = connect(mapStateToProps)(node)

export default connectedNode
// export default node
