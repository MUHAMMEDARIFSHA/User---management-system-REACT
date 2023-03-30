import { configureStore } from '@reduxjs/toolkit'
import { applyMiddleware } from '@reduxjs/toolkit'
import { composeWithDevTools } from '@redux-devtools/extension'
import thunk from 'redux-thunk'
import rootReducer from '../reducers/combineReducer'

const store = configureStore({reducer: rootReducer}, composeWithDevTools(applyMiddleware(thunk)))

export default store