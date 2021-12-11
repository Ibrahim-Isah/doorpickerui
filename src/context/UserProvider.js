import React, { createContext, useReducer } from "react";
import { POSTS_SET, POST_SET, USER_SET } from "./actions";
const initialState = {
  user: {},
  posts: [],
  post: {},
  loading: false,
};
const UserContext = createContext(initialState);

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case POSTS_SET:
        return {
          ...state,
          posts: action.data,
        };
      case POST_SET:
        return {
          ...state,
          post: action.data,
        };
      case USER_SET:
        return {
          ...state,
          user: action.data,
        };

      default:
        return state;
    }
  }, initialState);
  return (
    <UserContext.Provider value={[state, dispatch]}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
