import {
  AUTH_USER,
  CHANGE_REG_LOGIN,
  LOGIN_USER,
  AUTH_ERROR,
  CLEAN_ERRORS
} from "./actionTypes";
import { goToMainApp, goToAuth } from "../../screens/navigation";
import { AsyncStorage } from "react-native";

export const changeRegLogin = () => {
  return {
    type: CHANGE_REG_LOGIN
  };
};

export const tryAuth = authData => {
  console.log(authData, "datauser");
  return dispatch => {
    dispatch(cleanAuthErrors());
    fetch("http://192.168.1.146:8080/singup", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(authData)
    })
      .catch(err => {
        console.log(err);
      })
      .then(result => result.json())
      .then(resParsed => {
        console.log(resParsed);
        if (resParsed.error) {
          dispatch(authError(resParsed));
        } else {
          dispatch(authUser(authData));
        }
      });
  };
};

export const authUser = authData => {
  return {
    type: AUTH_USER,
    authData: authData
  };
};

export const loginUser = loginData => {
  console.log(loginData, "loginData");
  return dispatch => {
    dispatch(cleanAuthErrors());
    fetch("http://192.168.1.146:8080/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(loginData)
    })
      .catch(err => {
        console.log(err);
      })
      .then(res => res.json())
      .then(resParsed => {
        console.log(resParsed, 'tokenData');
        if (resParsed.error) {
          dispatch(authError(resParsed));
        } else {
          dispatch(authUser(resParsed));
          goToMainApp();
        }
      });
  };
};

export const checkUserToken = (token) => {
  console.log(token);
  return dispatch => {
    fetch("http://192.168.1.146:8080/check-login", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token
      }
    })
      .catch(err => {
        console.log(err);
      })
      .then(res => res.json())
      .then(resParsed => {
        console.log(resParsed, 'tokenData');
        if (resParsed.error) {
          goToAuth();
        } else {
          dispatch(authUser(resParsed));
          goToMainApp();
        }
      });
  }
}

export const stateLoginUser = token => {
  return {
    type: LOGIN_USER,
    token: token
  };
};

export const authError = resParsed => {
  return {
    type: AUTH_ERROR,
    error: resParsed
  };
};

export const cleanAuthErrors = () => {
  return {
    type: CLEAN_ERRORS
  };
};
