import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import productsReducer from "./reducers/products";
import listsReducer from "./reducers/lists";
import authReducer from "./reducers/auth";
import friendsReducer from "./reducers/friends";

const rootReducer = combineReducers({
  products: productsReducer,
  lists: listsReducer,
  auth: authReducer,
  friends: friendsReducer
});

let composeEnhancers = compose;
// if(__DEV__) {
//   composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// }

const configureStore = () => {
  return createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
};

export default configureStore;
