import firebase from 'firebase'

const SIGNUP_REQUEST = 'SIGNUP_REQUEST'
const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS'
const SIGNUP_FAILED = 'SIGNUP_FAILED'
const SIGNUP_VALIDATION_FAILED = 'SIGNUP_VALIDATION_FAILED'

function signupRequest() {
    return {
        type: SIGNUP_REQUEST
    }
}

function signupSucess() {
    return {
        type: SIGNUP_SUCCESS
    }
}

function signupFailed(error) {
    return {
        type: SIGNUP_FAILED,
        payload: error,
    }
}

export function singupValidationFailed(error) {
    return {
        type: SIGNUP_VALIDATION_FAILED,
        payload: error,
    }
}

//thunk
export function signup(email, password) {
    return (dispatch) => {
        dispatch(signupRequest());

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(() => {
                dispatch(signupSucess());
            })
            .catch(function (error) {
                console.log(error);
                dispatch(signupFailed());
            });
    }

    //api call

    //sucess -> dispatch(signupRequest())
    //failed -> dispatch(signupFailed())

}

const initialState = {
    isLoading: false,
    isSuccess: false,
    isFailed: false,
    error:null,
}

export default function signupReducer(state = initialState, action) {
    switch (action.type) {
        case SIGNUP_REQUEST:
            return Object.assign({}, state, {
                isLoading: true,
                isSuccess: false,
                isFailed: false,
                error:null,
            })
        case SIGNUP_SUCCESS:
            return Object.assign({}, state, {
                isLoading: false,
                isSuccess: true,
                isFailed: false,
            })
        case SIGNUP_FAILED:
            return Object.assign({}, state, {
                isLoading: false,
                isSuccess: false,
                isFailed: true,
                error:action.payload
            })
        case SIGNUP_VALIDATION_FAILED:
            return Object.assign({}, state, {
               error:action.payload,
            })

        default:
            return state;
    }

}