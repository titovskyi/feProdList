import {
  SET_PRODUCTS,
  ADD_PRODUCT,
  CHANGE_PRODUCT_STATE,
  REMOVE_PRODUCT,
  CHANGE_USER_PRODUCT,
  ADD_USER_PRODUCT
} from "./actionTypes";

export const getProducts = () => {
  return async(dispatch, getState) => {
    await fetch("http://192.168.1.146:8080/products/", {
      headers: {
        Authorization: "Bearer " + getState().auth.user.userToken
      }
    })
      .catch(err => {
        return Promise.reject(err);
      })
      .then(res => res.json())
      .then(resParsed => {
        dispatch(setProducts(resParsed.products));
        return Promise.resolve();
      });
  };
};

export const setProducts = products => {
  return {
    type: SET_PRODUCTS,
    products: products
  };
};

export const changeProduct = product => {
  return {
    type: CHANGE_USER_PRODUCT,
    product: product
  }
}

export const addUserProduct = product => {
  return {
    type: ADD_USER_PRODUCT,
    product: product
  }
}

export const createProduct = product => {
  return async(dispatch, getState) => {
    await fetch("http://192.168.1.146:8080/product/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getState().auth.user.userToken
      },
      body: JSON.stringify(product)
    })
      .catch(err => {
        return Promise.reject(err);
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
  return async(dispatch, getState) => {
    await fetch("http://192.168.1.146:8080/product-state", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getState().auth.user.userToken
      },
      body: JSON.stringify(prod)
    })
      .catch(err => {
        return Promise.reject(err);
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
  return async(dispatch, getState) => {
    await fetch("http://192.168.1.146:8080/delete-list-product", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getState().auth.user.userToken
      },
      body: JSON.stringify(prod)
    })
      .catch(err => {
        return Promise.reject(err);
      })
      .then(() => {
        dispatch(removeProductFromList(prod));
      });
  };
};

export const removeProductFromList = product => {
  return {
    type: REMOVE_PRODUCT,
    product: product
  };
};
