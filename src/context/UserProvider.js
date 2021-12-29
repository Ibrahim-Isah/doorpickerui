import React, { createContext, useReducer } from "react";
import {
  ALERT_SHOW,
  DRAFT_SET,
  MY_POSTS_SET,
  POSTS_DRAFT,
  POSTS_SET,
  POST_SET,
  USER_SET,
} from "./actions";
const initialState = {
  user: {},
  posts: [],
  myPosts: [],
  post: {},
  loading: false,
  drafts: [],
  draft: {},
  alert: { show: false },
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
      case POSTS_DRAFT:
        return {
          ...state,
          drafts: action.data,
          draft: action.data[0],
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
      case ALERT_SHOW:
        return {
          ...state,
          alert: action.data,
        };
      case DRAFT_SET:
        return {
          ...state,
          draft: action.data,
        };
      case MY_POSTS_SET:
        return {
          ...state,
          myPosts: action.data,
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
