import { takeEvery, takeLatest, put, call } from 'redux-saga/effects';
import { getByLocationName, getLocationForecast } from '../lib/api';

function* fetchLocationWeather(action) {
  try {
    let locationData = yield call(getByLocationName, action.location);
    const locationForecast = yield call (getLocationForecast, action.location);
    locationData = {...locationData, list: locationForecast.list};
    yield put({type: 'GET_BY_NAME_SUCCESS', locationData});
  } catch (e) {
    yield put({type: 'GET_BY_NAME_FAIL', e});
  }
}

export default function* mySaga() {
  yield takeEvery('GET_BY_NAME', fetchLocationWeather);
}