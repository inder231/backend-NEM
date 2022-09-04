import * as types from "./actionTypes";
import axios from "axios";

// get todos  ======================== GET  ***********************

export const getTodos = () => (dispatch) => {
  dispatch({ type: types.GET_TODO_REQUEST });
  return axios
    .get("http://localhost:8000/todos")
    .then((res) =>
      dispatch({ type: types.GET_TODO_SUCCESS, payload: res.data.todos })
    )
    .catch((err) => dispatch({ type: types.GET_TODO_FAILURE }));
};
// *************************************************************

// post todo ====================== POST -ADD  -------------------------

export const addTodo = (payload) => (dispatch) => {
  dispatch({ type: types.ADD_TODO_REQUEST });
  return axios
    .post("http://localhost:8000/todos", payload)
    .then((res) => dispatch({ type: types.ADD_TODO_SUCCESS }))
    .catch((err) => dispatch({ type: types.ADD_TODO_FAILURE }));
};

// ----------------------------------------------------------

// put / patch todo =============  UPDATE =============== &&&&&&&&&&&&&&
export const updateTodo = (id, payload) => (dispatch) => {
  dispatch({ type: types.UPDATE_TODO_REQUEST });
  return axios
    .patch(`http://localhost:8000/todos/${id}`,payload)
    .then((res) => dispatch({ type: types.UPDATE_TODO_SUCCESS }))
    .catch((err) => dispatch({ type: types.UPDATE_TODO_FAILURE }));
};
// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

// todo =====================   DELETE   ========@@@@@@@@@@@@@@@@@

export const deleteTodo = (id) => (dispatch) => {
  dispatch({ type: types.DELETE_TODO_REQUEST });
  return axios
    .delete(`http://localhost:8000/todos/${id}`)
    .then((res) => dispatch({ type: types.DELETE_TODO_SUCCESS }))
    .catch((err) => dispatch({ type: types.DELETE_TODO_FAILURE }));
};
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
