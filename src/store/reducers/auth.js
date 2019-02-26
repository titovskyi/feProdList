import { AUTH_USER, CHANGE_REG_LOGIN, LOGIN_USER } from "../actions/actionTypes";
import { AsyncStorage } from 'react-native';
const initialState = {
  user: {
    authanticated: false,
    signUpPage: false
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_REG_LOGIN:
      return {
        ...state,
        user: { ...state.user, signUpPage: !state.user.signUpPage }
      };
    case AUTH_USER:
      console.log(action.authData, 'action.user');
      if (action.authData.userToken) {
        AsyncStorage.setItem('token', action.authData.userToken);
      }
      return {
        ...state,
        user: { ...action.authData, authanticated: true, signUpPage: false }
      };
    case LOGIN_USER:
      return {
        ...state,
        user: { ...action.token, authanticated: true }
      };
    default:
      return state;
  }
};

export default reducer;
