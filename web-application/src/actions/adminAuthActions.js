import { ADMIN_SET_AUTH,ADMIN_CLEAR_AUTH } from "../actionTypes/adminAuthTypes";

export const setAuth = () => {
    return{
      type: ADMIN_SET_AUTH
  }
}
  export const clearAuth = () => {
    return{
      type: ADMIN_CLEAR_AUTH
    }
}