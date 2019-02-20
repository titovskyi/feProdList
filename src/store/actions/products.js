import {
  SET_PRODUCTS,
  ADD_PRODUCT,
  CHANGE_PRODUCT_STATE,
  REMOVE_PRODUCT
} from "./actionTypes";

export const getProducts = listId => {
  return dispatch => {
    fetch("http://192.168.1.146:8080/products/")
      .catch(err => {
        alert("Something went wrong, sorry!");
        console.log("err");
      })
      .then(res => res.json())
      .then(resParsed => {
        dispatch(setProducts(resParsed));
      });
  };
};

export const setProducts = products => {
  return {
    type: SET_PRODUCTS,
    products: products
  };
};

export const createProduct = product => {
  return dispatch => {
    fetch("http://192.168.1.146:8080/product/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(product)
    })
      .catch(err => {
        console.log(err);
        alert("Проблемы с сервером, попробуйте позже");
      })
      .then(res => res.json())
      .then(resParsed => {
        dispatch(addProduct(resParsed.product));
      });
  };
};

export const addProduct = product => {
  return {
    type: ADD_PRODUCT,
    product: product
  };
};

export const changeProdState = prod => {
  return dispatch => {
    fetch("http://192.168.1.146:8080/product-state", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(prod)
    })
      .catch(err => {
        console.log(err);
        alert("Проблемы с сервером, попробуйте позже");
      })
      .then(res => res.json())
      .then(resParsed => {
        dispatch(setNewProdState(resParsed.product));
      });
  };
};

export const setNewProdState = prod => {
  return {
    type: CHANGE_PRODUCT_STATE,
    prod: prod
  };
};

export const deleteProductFromList = prod => {
  return dispatch => {
    fetch("http://192.168.1.146:8080/delete-list-product", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(prod)
    })
      .catch(err => console.log(err))
      // .then(res => res.json())
      .then(() => {
        console.log(prod, 'prod');
        dispatch(removeProductFromList(prod));
      });
  };
};

export const removeProductFromList = product => {
  console.log(product, 'delete');
  return {
    type: REMOVE_PRODUCT,
    product: product
  };
};
