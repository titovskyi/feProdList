import { SET_FRIENDS, ADD_FRIEND } from './actionTypes';

export const getFriends = () => {
  return async(dispatch, getState) => {
    await fetch("http://192.168.1.146:8080/friends", {
      headers: {
        Authorization: "Bearer " + getState().auth.user.userToken
      }
    })
      .catch(err => {
        return Promise.reject(err);
      })
      .then(res => res.json())
      .then(resParsed => {
        dispatch(setFriends(resParsed.friends));
        return Promise.resolve();
      });
  };
};

export const setFriends = friends => {
  return {
    type:SET_FRIENDS,
    friends: friends
  }
}

export const createFriend = email => {
  return async(dispatch, getState) => {
    await fetch("http://192.168.1.146:8080/friend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getState().auth.user.userToken
      },
      body: JSON.stringify({email: email})
    })
      .catch(err => {
        return Promise.reject(err);
      })
      .then(res => res.json())
      .then(resParsed => {
        if(resParsed.error){
          return Promise.reject(resParsed);
        }
        dispatch(addFriend(resParsed.friend));
      });
  };
};

export const addFriend = friend => {
  return {
    type: ADD_FRIEND,
    friend: friend
  };
};