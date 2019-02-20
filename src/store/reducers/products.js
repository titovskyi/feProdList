import { SET_PRODUCTS, ADD_PRODUCT } from '../actions/actionTypes';

const initialState = {
  products: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS: 
      return {
        ...state,
        products: action.products
      }
    case ADD_PRODUCT:
      return {
        ...state,
        products: state.products.concat(action.product)
      }
    default: 
      return state;
  }
}

export default reducer;