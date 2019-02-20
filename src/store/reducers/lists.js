import {
  SET_LISTS,
  SET_LIST,
  UPDATE_LIST,
  REMOVE_LIST,
  ADD_PRODUCT,
  CHANGE_PRODUCT_STATE,
  REMOVE_PRODUCT
} from "../actions/actionTypes";

const initialState = {
  lists: [],
  products: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LISTS:
      return {
        ...state,
        lists: action.lists
      };
    case SET_LIST:
      return {
        ...state,
        products: action.products
      };
    case REMOVE_LIST:
      return {
        lists: state.lists.filter(list => list.id !== action.listId)
      };
    case UPDATE_LIST:
      const newList = {
        id: action.list.listId,
        name: action.list.listName
      };
      return {
        ...state,
        lists: state.lists.map(list => {
          if (list.id !== action.list.listId) {
            return list;
          }
          return { ...newList };
        })
      };
    case ADD_PRODUCT:
      return {
        ...state,
        products: state.products.concat(action.product)
      };
    case REMOVE_PRODUCT:
      return {
        ...state,
        products: state.products.filter((product) => product.id !== action.product.id)
      };
    case CHANGE_PRODUCT_STATE:
      return {
        ...state,
        products: state.products.map(product => {
          if (product.id !== action.prod.id) {
            return product;
          }
          return { ...action.prod };
        })
      };
    default:
      return state;
  }
};

export default reducer;
