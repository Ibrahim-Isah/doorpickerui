import React, { createContext, useReducer } from "react";
const initialState = {
  user: {},
  posts: [],
  loading: false,
};
const UserContext = createContext(initialState);

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "POSTS_SET":
        return {
          ...state,
          posts: action.data,
        };
      case "USER_SET":
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
