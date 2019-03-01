import { SET_PRODUCTS, ADD_USER_PRODUCT, CHANGE_USER_PRODUCT } from '../actions/actionTypes';

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
    case CHANGE_USER_PRODUCT:
      return {
        ...state,
        // products: { ...state.products, ...action.product }
        products: state.products.map((item) => {
          if(item.id === action.product.id) {
            return action.product;
          }
          return item;
        })
      }
    case ADD_USER_PRODUCT:
      
      return {
        ...state,
        products: state.products.concat(action.product)
      }
    default: 
      return state;
  }
}

export default reducer;