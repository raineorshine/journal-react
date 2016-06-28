import * as chai from 'chai'
import * as journalReact from '../index.js'
const should = chai.should()

describe('journalReact', () => {
  it('should do something', () => {
    journalReact.doSomething().should.equal(12345)
  })
})
