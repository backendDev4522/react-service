import {createStore, combineReducers, applyMiddleware} from 'redux'
import authReducer from './authReducer'
import thunk from 'redux-thunk'




export function configureStore(){
    return createStore(
        combineReducers({
            auth:authReducer
        }),
        applyMiddleware(thunk)
    )
}
