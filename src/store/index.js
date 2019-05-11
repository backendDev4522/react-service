import {createStore, combineReducers, applyMiddleware} from 'redux'
import authReducer from './authReducer'
import signupReducer from './signupReducer'
import thunk from 'redux-thunk'




export function configureStore(){
    return createStore(
        combineReducers({
            auth:authReducer,
            signup:signupReducer
        }),
        applyMiddleware(thunk)
    )
}
