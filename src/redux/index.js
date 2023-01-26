import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import { encryptTransform } from "redux-persist-transform-encrypt";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import loggedInUserReducer from "./reducers/loggedInReducer";
import usersTokensReducer from "./reducers/usersReducer";

const workingMiddleware =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const initialState = {
  tokens: {
    accessToken: "",
    refreshToken: ""
  },
  loggedInUser: {
    isLoggedIn: false,
    user: {},
    isAdmin: false
  }
};

const persistConfig = {
  key: "root", // this is referring to the entire stor object
  storage, // this is referring to the local storage
  transforms: [
    // this is encrypting the object that gets stored in the local storage so the user cannot manipulate
    encryptTransform({
      secretKey: process.env.REACT_APP_STORE_ENCRYPT_KEY //this key is a key that is stored in the dotEnv file that is in your local machine
    }) // This key can be anything you want it to be
  ]
};

const mainReducer = combineReducers({
  tokens: usersTokensReducer,
  loggedInUser: loggedInUserReducer
});

const persistedReducer = persistReducer(persistConfig, mainReducer);

const configureStore = createStore(
  persistedReducer,
  initialState,
  workingMiddleware(applyMiddleware(thunk))
);

export default configureStore;
export const persister = persistStore(configureStore);
