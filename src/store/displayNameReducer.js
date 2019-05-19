import firebase from 'firebase'
import { updateUser } from './authReducer'


const UPDATE_DISPLAY_NAME_REQUEST = 'UPDATE_DISPLAY_NAME_REQUEST'
const UPDATE_DISPLAY_NAME_SUCCESS = 'UPDATE_DISPLAY_NAME_SUCCESS'
const UPDATE_DISPLAY_NAME_FAILED = 'UPDATE_DISPLAY_NAME_FAILED'

const DISPLAY_NAME_VALIDATION_FAILED = 'DISPLAY_NAME_VALIDATION_FAILED'

function updataDisplayNameRequest() {
    return {
        type: UPDATE_DISPLAY_NAME_REQUEST,
    }
}

function updataDisplayNameSuccess() {
    return {
        type: UPDATE_DISPLAY_NAME_SUCCESS,
    }
}

function updateDisplayNameFailed(error) {
    return {
        type: UPDATE_DISPLAY_NAME_FAILED,
        payload: error
    }
}

export function displayNameValidationFailed(error) {
    return {
        type: DISPLAY_NAME_VALIDATION_FAILED,
        payload: error
    }

}

export function updateDisplayName(displayName) {
    return (dispatch) => {
        dispatch(updataDisplayNameRequest());
        const user = firebase.auth().currentUser;
        
        if (user) {
            //로그인 한 상태일 때만 가능
            user.updateProfile({
                displayName: displayName,
            }).then(() => {
                dispatch(updataDisplayNameSuccess());
                dispatch(updateUser(firebase.auth().currentUser))
            }).catch((error) => {
                dispatch(updateDisplayNameFailed(error));
            })
        } else {
            //로그인 하지 않은 상태에서 불가능
            dispatch(updateDisplayNameFailed(new Error('user is not Login')))
        }


    }
}

const initialState = {
    isLoading: false,
    isSuccess: false,
    isFailed: false,
    error: null,
}

export default function displayNameReducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_DISPLAY_NAME_REQUEST:
            return Object.assign({}, state, {
                isLoading: true,
                isSuccess: false,
                isFailed: false,
                error: null,
            })
        case UPDATE_DISPLAY_NAME_SUCCESS:
            return Object.assign({}, state, {
                isLoading: false,
                isSuccess: true,
                isFailed: false,
            })
        case UPDATE_DISPLAY_NAME_FAILED:
            return Object.assign({}, state, {
                isLoading: false,
                isSuccess: false,
                isFailed: true,
                error: action.payload
            })
        case DISPLAY_NAME_VALIDATION_FAILED:
            return Object.assign({}, state, {
                error: action.payload
            })

        default:
            return state;
    }

}