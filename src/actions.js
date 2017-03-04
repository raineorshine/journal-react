import * as cheerio from 'cheerio'

/** Parses an HTML outline into a tree of nodes. */
function parseOutline(html) {
  const $ = cheerio.load(html)

  function parseNode(node) {
    return {
      id: node.attr('data-id'),
      value: node.children('.content').text(),
      parent: node.parent().parent().attr('data-id'),
      children: node.children('ul').children().map((i, el) => {
        return parseNode($(el))
      }).get()
    }
  }

  return parseNode($('#root'))
}

export const outlineChange = value => {
  return { type: 'OUTLINE_CHANGE', data: value/*parseOutline(value)*/ }
}
