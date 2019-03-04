import { SET_LISTS, SET_LIST, REMOVE_LIST, UPDATE_LIST } from "./actionTypes";

export const getLists = () => {
  return async(dispatch, getState) => {
    await fetch("http://192.168.1.146:8080/lists", {
      headers: {
        Authorization: "Bearer " + getState().auth.user.userToken
      }
    })
      .catch(err => {
        return Promise.reject(err);
      })
      .then(res => res.json())
      .then(resParsed => {
        dispatch(setLists(resParsed.lists));
        return Promise.resolve();
      });
  };
};

export const setLists = lists => {
  return {
    type: SET_LISTS,
    lists: lists
  };
};

export const getList = (listId) => {
  return async(dispatch, getState) => {
    await fetch("http://192.168.1.146:8080/lists/" + listId, {
      headers: {
        Authorization: "Bearer " + getState().auth.user.userToken
      }
    })
      .catch(err => {
        return Promise.reject(err);
      })
      .then(res => res.json())
      .then(resParsed => {
        dispatch(setList(resParsed.products));
        return Promise.resolve();
      });
  } 
}

export const setList = products => {
  return {
    type: SET_LIST,
    products: products
  };
}

export const createList = listName => {
  return async(dispatch, getState) => {
    const addList = {
      listName: listName
    };
    await fetch("http://192.168.1.146:8080/list", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getState().auth.user.userToken
      },
      body: JSON.stringify(addList)
    })
      .catch(err => {
        return Promise.reject(err);
      })
      .then((res) => {
        dispatch(getLists());
      });
  };
};

export const putList = list => {
  return async(dispatch, getState) => {
    await fetch("http://192.168.1.146:8080/update-list", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getState().auth.user.userToken
      },
      body: JSON.stringify(list)
    })
      .catch(err => {
        return Promise.reject(err);
      })
      .then(() => {
        dispatch(updateList(list));
      })
  };
};

export const updateList = list => {
  return {
    type: UPDATE_LIST,
    list: list
  };
};

export const deleteList = listId => {
  return async(dispatch, getState) => {
    const deleteList = {
      deleteListId: listId
    };

    await fetch("http://192.168.1.146:8080/delete-list", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getState().auth.user.userToken
      },
      body: JSON.stringify(deleteList)
    })
      .catch(err => {
        return Promise.reject(err);
      })
      .then(() => {
        dispatch(removeList(listId));
        return Promise.resolve();
      });
  };
};

export const removeList = listId => {
  return {
    type: REMOVE_LIST,
    listId: listId
  };
};


