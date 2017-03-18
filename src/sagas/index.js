import { put, takeLatest } from 'redux-saga/effects'

export function* someActionSaga(action) {
  yield put({ type: 'ANOTHER_ACTION', action });
}

export function* watchAction() {
  yield* takeLatest('SOME_ACTION', someActionSaga);
}

export default function* rootSaga() {
  yield [
    watchAction()
  ];
}
