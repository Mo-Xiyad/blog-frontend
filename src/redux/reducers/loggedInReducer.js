import {
  IS_USER_ADMIN,
  IS_USER_LOGGED_IN,
  LOGGED_IN_USERS_DATA
} from "../actions";
import { initialState } from "../index";

const loggedInUserReducer = (state = initialState.loggedInUser, action) => {
  switch (action.type) {
    case IS_USER_LOGGED_IN:
      console.log(action.payload);
      return {
        ...state,
        isLoggedIn: action.payload
      };
    case LOGGED_IN_USERS_DATA:
      return {
        ...state,
        user: action.payload
      };
    case IS_USER_ADMIN:
      return {
        ...state,
        isAdmin: action.payload
      };
    default:
      return state;
  }
};

export default loggedInUserReducer;
