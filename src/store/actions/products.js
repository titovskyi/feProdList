import {
  SET_PRODUCTS,
  ADD_PRODUCT,
  CHANGE_PRODUCT_STATE,
  REMOVE_PRODUCT
} from "./actionTypes";

export const getProducts = () => {
  return (dispatch, getState) => {
    fetch("http://192.168.1.146:8080/products/", {
      headers: {
        Authorization: "Bearer " + getState().auth.user.token
      }
    })
      .catch(err => {
        alert("Something went wrong, sorry!");
        console.log("err");
      })
      .then(res => res.json())
      .then(resParsed => {
        console.log(resParsed, 'allproductssdssdadasdas');
        dispatch(setProducts(resParsed.products));
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
  return (dispatch, getState) => {
    fetch("http://192.168.1.146:8080/product/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getState().auth.user.token
      },
      body: JSON.stringify(product)
    })
      .catch(err => {
        console.log(err);
        alert("Проблемы с сервером, попробуйте позже");
      })
      .then(res => res.json())
      .then(resParsed => {
        console.log(resParsed, "parsed added Product");
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
  return (dispatch, getState) => {
    fetch("http://192.168.1.146:8080/product-state", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getState().auth.user.token
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
  return (dispatch, getState) => {
    fetch("http://192.168.1.146:8080/delete-list-product", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getState().auth.user.token
      },
      body: JSON.stringify(prod)
    })
      .catch(err => console.log(err))
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
