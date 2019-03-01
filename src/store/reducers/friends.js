import { SET_FRIENDS, ADD_FRIEND } from '../actions/actionTypes';

const initialState = {
  friends: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FRIENDS:
      return {
        ...state,
        friends: action.friends
      };
    case ADD_FRIEND:
      return {
        ...state,
        friends: state.friends.concat(action.friend)
      }
    default:
      return state;
  }
};

export default reducer;