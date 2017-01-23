
const ADD_TO_MINE = 'ADD_TO_MINE';

export const addLocation = (id) =>({
  type: ADD_TO_MINE,
  id,
})

export const mine = (state = [], action) => {
  switch (action.type) {
    case ADD_TO_MINE:
      return [...state, action.id];
    default:
      return state;
  }
}