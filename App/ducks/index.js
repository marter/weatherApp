import { combineReducers } from 'redux';
import { locations } from './location';
import { mine } from './mine';

export default combineReducers({
  locations,
  mine,
})