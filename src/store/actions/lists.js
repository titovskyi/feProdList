import { SET_LISTS, SET_LIST, REMOVE_LIST, UPDATE_LIST } from "./actionTypes";

export const getLists = () => {
  return dispatch => {
    fetch("http://192.168.1.146:8080/lists")
      .catch(err => {
        console.log(err);
        alert("Проблемы с сервером, попробуйте позже");
      })
      .then(res => res.json())
      .then(resParsed => {
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
  return dispatch => {
    fetch("http://192.168.1.146:8080/lists/" + listId)
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
  return dispatch => {
    const addList = {
      listName: listName
    };
    fetch("http://192.168.1.146:8080/list", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(addList)
    })
      .catch(err => {
        console.log(err);
        alert("Проблемы с сервером, попробуйте позже");
      })
      .then(() => {
        dispatch(getLists());
      });
  };
};

export const putList = list => {
  return dispatch => {
    fetch("http://192.168.1.146:8080/update-list", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
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
  return dispatch => {
    const deleteList = {
      deleteListId: listId
    };

    fetch("http://192.168.1.146:8080/delete-list", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
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


