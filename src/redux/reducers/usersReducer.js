import { initialState } from "../index";

import { GET_USER_TOKENS } from "../actions";

const usersTokensReducer = (state = initialState.tokens, action) => {
  switch (action.type) {
    case GET_USER_TOKENS:
      return {
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken
      };
    default:
      return state;
  }
};

export default usersTokensReducer;
