import { put, takeLatest } from 'redux-saga/effects'
import * as Constants from 'actions/constants'

export function* someActionSaga(action) {
  yield put({ type: Constants.ANOTHER_ACTION, action });
}

export function* watchAction() {
  yield* takeLatest(Constants.SOME_ACTION, someActionSaga);
}

export default function* rootSaga() {
  yield [
    watchAction()
  ];
}
