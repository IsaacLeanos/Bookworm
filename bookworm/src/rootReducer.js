import{combineReducers}from'redux'
import userReducer from './reducers/user'
import bookReducer from './reducers/book'

export default combineReducers({
    userReducer,
    bookReducer
})

