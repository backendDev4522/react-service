import firebase from 'firebase'

const SIGNUP_REQUEST = 'SIGNUP_REQUEST'
const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS'
const SIGNUP_FAILED = 'SIGNUP_FAILED'

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

function signupFailed() {
    return {
        type: SIGNUP_FAILED
    }
}

//thunk
export function signup(email, password) {
    return (dispatch) => {
        dispatch(signupRequest());

        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(()=>{
            dispatch(signupSucess());
        })
        .catch(function(error) {
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
}

export default function signupReducer(state = initialState, action) {
    switch (action.type) {
        case SIGNUP_REQUEST:
            return Object.assign({}, state, {
                isLoading: true,
                isSuccess: false,
                isFailed: false,
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
            })

        default:
            return state;
    }

}