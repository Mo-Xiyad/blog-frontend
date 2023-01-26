export const IS_USER_LOGGED_IN = "IS_USER_LOGGED";
export const LOGGED_IN_USERS_DATA = "LOGGED_IN_USERS_DATA";
export const IS_USER_ADMIN = "IS_USER_ADMIN";
export const GET_USER_TOKENS = "GET_USER_TOKENS";

export const checkLoggedInUser = (data) => ({
  type: IS_USER_LOGGED_IN,
  payload: data, // this is going to be the item we intend to add to the favorite list
  // the payload is any other piece of info required by the reducer to understand
  // what we want to do with this action
});
export const setLoggedInUserData = (data) => ({
  type: LOGGED_IN_USERS_DATA,
  payload: data,
});
export const setTokens = (tokens) => ({
  type: GET_USER_TOKENS,
  payload: tokens,
});
