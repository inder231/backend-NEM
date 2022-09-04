import * as types from "./actionTypes";
const initState = {
  isLoading: false,
  isError: false,
  token: "",
  isAuth: false,
};
export const reducer = (state=initState,{type,payload})=>{
    return state;
}
