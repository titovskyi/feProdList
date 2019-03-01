import { AUTH_USER } from "./actionTypes";
import { goToMainApp, goToAuth } from "../../screens/navigation";

export const tryAuth = authData => {
  return async(dispatch) => {
    await fetch("http://192.168.1.146:8080/singup", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(authData)
    })
      .catch(err => {
        return Promise.reject(err);
      })
      .then(result => result.json())
      .then(resParsed => {
        if (resParsed.error) {
          return Promise.reject(resParsed);
        } else {
          dispatch(authUser(authData));
          return Promise.resolve();
        }
      });
  };
};

export const loginUser = loginData => {
  return async(dispatch) => {
    await fetch("http://192.168.1.146:8080/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(loginData)
    })
      .catch(err => {
        return Promise.reject(err);
      })
      .then(res => res.json())
      .then(resParsed => {
        if (resParsed.error) {
          return Promise.reject(resParsed);
        } else {
          dispatch(authUser(resParsed));
          goToMainApp();
        }
      });
  };
};

export const checkUserToken = (token) => {
  return dispatch => {
    fetch("http://192.168.1.146:8080/check-login", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token
      }
    })
      .catch(err => {
        goToAuth();
      })
      .then(res => res.json())
      .then(resParsed => {
        if (resParsed.error) {
          goToAuth();
        } else {
          dispatch(authUser(resParsed));
          goToMainApp();
        }
      });
  }
}

export const authUser = authData => {
  return {
    type: AUTH_USER,
    authData: authData
  };
};
