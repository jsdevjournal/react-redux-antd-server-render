import test from 'tape'
import { someAction } from '../../src/actions/actionCreator'
import * as Constants from '../../src/actions/constants'

test('someAction', (t) => {

  const action = someAction()

  t.equal(action.type, Constants.SOME_ACTION)
  t.end()
});
