import { SET_AUTH, CLEAR_AUTH } from "../actionTypes/authTypes"

console.log(localStorage.getItem('token'))
// console.log(JSON.parse(localStorage.getItem('token')));

const initialState = {
  auth: localStorage.getItem('token')? localStorage.getItem('token') : null
}

const authReducer = (state = initialState, action) => {
  switch(action.type) {
    case SET_AUTH:
        console.log("entered set auth");
      return{
        auth: localStorage.getItem('token')
      }
    case CLEAR_AUTH:
        console.log("entered clear auth");
      return{
        auth: null
      }
    default: return state
  }
}


export default authReducer


// import { SET_AUTH, CLEAR_AUTH } from "../actionTypes/authTypes"

// const token = localStorage.getItem('token')
// console.log('Token from localStorage:', token)

// const initialState = {
//   auth: token ? JSON.parse(token) : null
// }

// const authReducer = (state = initialState, action) => {
//   switch(action.type) {
//     case SET_AUTH:
//       console.log('Setting auth token in localStorage:', action.payload)
//       localStorage.setItem('token', JSON.stringify(action.payload))
//       return{
//         auth: action.payload
//       }
//     case CLEAR_AUTH:
//       console.log('Clearing auth token from localStorage')
//       localStorage.removeItem('token')
//       return{
//         auth: null
//       }
//     default: 
//       return state
//   }
// }

// export default authReducer

