
const GET_BY_NAME = 'GET_BY_NAME';
const GET_BY_NAME_SUCCESS = 'GET_BY_NAME_SUCCESS';
const GET_BY_NAME_FAIL = 'GET_BY_NAME_FAIL';

export const getLocation = (location) =>({
  type: GET_BY_NAME,
  location,
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
      }
    case GET_BY_NAME:
    default:
      return state;
  }
}