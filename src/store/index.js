import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import authReducer from './authReducer'
import signupReducer from './signupReducer'
import loginReducer from './loginReducer'
import thunk from 'redux-thunk'




export function configureStore(){
    return createStore(
        combineReducers({
            auth:authReducer,
            signup:signupReducer,
            login:loginReducer
        }),
        compose(
            applyMiddleware(thunk),
            window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
        )
        
    )
}
