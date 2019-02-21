import { AUTH_USER } from '../actions/actionTypes';

const initialState = {
  users: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_USER: 
    console.log(action.authData, 'reducer');
      return {
        ...state,
        users: action.authData
      }
    default: 
      return state;
  }
}

export default reducer;