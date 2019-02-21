import { AUTH_USER } from './actionTypes';

export const authUser = (authData) => {
  return {
    type: AUTH_USER,
    authData: authData
  }
}