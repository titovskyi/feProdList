import { AUTH_ERROR, CLEAN_ERRORS } from '../actions/actionTypes';

const initialState = {
  errors: []
};

const reducer = (state = initialState, action) => {
  console.log(action.error, 'actioerror');
  switch (action.type) {
    case CLEAN_ERRORS:
      return {
        ...state,
        errors: []
      }
    case AUTH_ERROR:
      return {
        ...state,
        errors: action.error
      }
    default: 
      return state;
  }
}

export default reducer;