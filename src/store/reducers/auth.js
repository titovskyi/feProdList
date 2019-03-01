import { AUTH_USER,  } from "../actions/actionTypes";
import { AsyncStorage } from "react-native";
const initialState = {
  user: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_USER:
      if (action.authData.userToken) {
        AsyncStorage.setItem("token", action.authData.userToken);
      }
      return {
        ...state,
        user: { ...action.authData }
      };
    default:
      return state;
  }
};

export default reducer;
