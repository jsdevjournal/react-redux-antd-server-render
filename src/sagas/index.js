import { put, takeLatest } from 'redux-saga/effects'
import * as Constant from 'actions/constant'

export function* someActionSaga(action) {
  yield put({ type: Constant.ANOTHER_ACTION, action });
}

export function* watchAction() {
  yield* takeLatest(Constant.SOME_ACTION, someActionSaga);
}

export default function* rootSaga() {
  yield [
    watchAction()
  ];
}
