
const GET_BY_NAME = 'GET_BY_NAME';
const GET_BY_NAME_SUCCESS = 'GET_BY_NAME_SUCCESS';
const GET_BY_NAME_FAIL = 'GET_BY_NAME_FAIL';
const GET_FORECAST_SUCCESS = 'GET_FORECAST_SUCCESS';

export const getLocation = (location) =>({
  type: GET_BY_NAME,
  location,
});

export const getForecast = (id) => ({
  type: GET_FORECAST,
  id,
})

export const locations = (state = {}, action) => {
  switch (action.type) {
    case GET_BY_NAME_SUCCESS:
      return {
        ...state,
        [action.locationData.id]: action.locationData,
      };
    case GET_BY_NAME_FAIL:
      return {
        ...state,
        [action.locationData.id]: 'fail',
      };
    case GET_FORECAST_SUCCESS:
      let loc = state[action.city.id];
      let list = action.list;
      return {
        ...state,
        [action.city.id]: {...loc, list},
      };
    default:
      return state;
  }
}