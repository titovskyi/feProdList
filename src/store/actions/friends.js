import { SET_FRIENDS, ADD_FRIEND, REMOVE_FRIEND } from './actionTypes';

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

export const shareList = (friendEmail, listId) => {
  return async(dispatch, getState) => {
    const shareList = {
      friendEmail: friendEmail,
      listId: listId
    };
    console.log(shareList, 'share');
    return await fetch("http://192.168.1.146:8080/share-list", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + getState().auth.user.userToken
        },
        body: JSON.stringify(shareList)
      })
      .catch(err => {
        console.log(err, 'err');
        return Promise.reject(err);
      })
      .then(res => res.json())
      .then((resParsed) => {
        console.log(resParsed, 'res');
        return Promise.resolve(resParsed);
      });
  };
};

export const deleteFriend = (friendEmail) => {
  console.log(friendEmail);
  return async(dispatch, getState) => {
    return await fetch("http://192.168.1.146:8080/delete-friend", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getState().auth.user.userToken
      },
      body: JSON.stringify({email: friendEmail})
    })
    .catch(err => {
      return Promise.reject(err);
    })
    .then(() => {
      dispatch(removeFriend(friendEmail));
    })
  }
}

export const removeFriend = (friendEmail) => {
  return {
    type: REMOVE_FRIEND,
    friendEmail: friendEmail
  }
}