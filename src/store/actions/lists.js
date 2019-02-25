import { SET_LISTS, SET_LIST, REMOVE_LIST, UPDATE_LIST } from "./actionTypes";

export const getLists = () => {
  return (dispatch, getState) => {
    fetch("http://192.168.1.146:8080/lists", {
      headers: {
        Authorization: "Bearer " + getState().auth.user.token
      }
    })
      .catch(err => {
        console.log(err);
        alert("Проблемы с сервером, попробуйте позже");
      })
      .then(res => res.json())
      .then(resParsed => {
        console.log(resParsed, 'getuserlists');
        dispatch(setLists(resParsed.lists));
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
  return (dispatch, getState) => {
    fetch("http://192.168.1.146:8080/lists/" + listId, {
      headers: {
        Authorization: "Bearer " + getState().auth.user.token
      }
    })
      .catch(err => {
        console.log(err);
        alert("Проблемы с сервером, попробуйте позже");
      })
      .then(res => res.json())
      .then(resParsed => {
        dispatch(setList(resParsed.products));
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
  return (dispatch, getState) => {
    const addList = {
      listName: listName
    };
    fetch("http://192.168.1.146:8080/list", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getState().auth.user.token
      },
      body: JSON.stringify(addList)
    })
      .catch(err => {
        console.log(err);
        alert("Проблемы с сервером, попробуйте позже");
      })
      .then((res) => {
        console.log(res);
        dispatch(getLists());
      });
  };
};

export const putList = list => {
  return (dispatch, getState) => {
    fetch("http://192.168.1.146:8080/update-list", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getState().auth.user.token
      },
      body: JSON.stringify(list)
    })
      .catch(err => {
        console.log(err);
        alert("Проблемы с сервером, попробуйте позже");
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
  return (dispatch, getState) => {
    const deleteList = {
      deleteListId: listId
    };

    fetch("http://192.168.1.146:8080/delete-list", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getState().auth.user.token
      },
      body: JSON.stringify(deleteList)
    })
      .catch(err => {
        console.log(err);
        alert("Проблемы с сервером, попробуйте позже");
      })
      .then(() => {
        dispatch(removeList(listId));
      });
  };
};

export const removeList = listId => {
  return {
    type: REMOVE_LIST,
    listId: listId
  };
};


