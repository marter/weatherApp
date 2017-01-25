import { takeEvery, takeLatest, put, call } from 'redux-saga/effects';
import { getByLocationName, getLocationForecast } from '../lib/api';

function* fetchLocationWeather(action) {
  try {
    let locationData = yield call(getByLocationName, action.location);
    yield put({type: 'GET_BY_NAME_SUCCESS', locationData});
  } catch (e) {
    yield put({type: 'GET_BY_NAME_FAIL', e});
  }
}

function* fetchForecast(action) {
  try {
    let loc = yield call(getLocationForecast, action.id);
    yield put({type: 'GET_FORECAST_SUCCESS', loc});
  } catch (e) {
    yield put({type: 'GET_BY_NAME_FAIL', e});
  }
}

export default function* mySaga() {
  yield takeLatest('GET_BY_NAME', fetchLocationWeather);
  yield takeLatest('GET_FORECAST', fetchForecast);
}