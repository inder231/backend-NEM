import * as types from "./actionTypes";
const initState = {
  isLoading: false,
  isError: false,
  todos: [],
};
export const reducer = (state = initState, { type, payload }) => {
  switch (type) {
    case types.GET_TODO_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case types.GET_TODO_SUCCESS:
      return {
        ...state,
        isLoading: false,
        todos: payload,
      };
    case types.GET_TODO_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      return state;
  }
};
