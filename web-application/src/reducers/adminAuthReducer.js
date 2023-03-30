import { ADMIN_SET_AUTH,ADMIN_CLEAR_AUTH } from "../actionTypes/adminAuthTypes";

console.log(localStorage.getItem('token'))
// console.log(JSON.parse(localStorage.getItem('token')));

const initialState = {
  auth: localStorage.getItem('token')? localStorage.getItem('token') : null
}

const AdminAuthReducer = (state = initialState, action) => {
  switch(action.type) {
    case ADMIN_SET_AUTH:
        console.log("entered set auth");
      return{
        auth: localStorage.getItem('token')
      }
    case ADMIN_CLEAR_AUTH:
        console.log("entered clear auth");
      return{
        auth: null
      }
    default: return state
  }
}

export default AdminAuthReducer