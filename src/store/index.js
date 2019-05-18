import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import authReducer from './authReducer'
import signupReducer from './signupReducer'
import loginReducer from './loginReducer'
import thunk from 'redux-thunk'
import logoutReducer from './logoutReducer';
import displayNameReducer from './displayNameReducer';




export function configureStore(){
    return createStore(
        combineReducers({
            auth:authReducer,
            signup:signupReducer,
            displayName:displayNameReducer,
            login:loginReducer,
            logout:logoutReducer,
        }),
        compose(
            applyMiddleware(thunk),
            window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
        )
        
    )
}
