import { takeEvery, takeLatest, put, call } from 'redux-saga/effects';
import { getByLocationName } from '../lib/api';

function* fetchLocationWeather(action) {
  try {
    const locationData = yield call(getByLocationName, action.location);
    yield put({type: 'GET_BY_NAME_SUCCESS', locationData});
  } catch (e) {
    yield put({type: 'GET_BY_NAME_FAIL', e});
  }
}

export default function* mySaga() {
  yield takeEvery('GET_BY_NAME', fetchLocationWeather);
}