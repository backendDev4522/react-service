import firebase from 'firebase'
import { DELETE_MY_MOVIE_SUCCESS } from './types'
const GET_MY_MOVIE_LIST_REQUEST = 'GET_MY_MOVIE_LIST_REQUEST';
const GET_MY_MOVIE_LIST_SUCCESS = 'GET_MY_MOVIE_LIST_SUCCESS';
const GET_MY_MOVIE_LIST_FAILED = 'GET_MY_MOVIE_LIST_FAILED';

function getMyMovieListRequest() {
    return {
        type: GET_MY_MOVIE_LIST_REQUEST
    }
}

function getMyMovieListSuccess(list, last) {
    return {
        type: GET_MY_MOVIE_LIST_SUCCESS,
        payload: {
            list: list,
            last: last,
        }
    }
}


function getMyMovieListFailed(error) {
    return {
        type: GET_MY_MOVIE_LIST_FAILED,
        payload: error,
    }
}

export function getMyMovieList(last) {
    return (dispatch, getState) => {
        dispatch(getMyMovieListRequest());
        let query = null;
        const userId = getState().auth.user.uid;

        if (last) {
            console.log(userId);
            query = firebase.firestore().collection('movies')
                .where('userId', '==', userId)
                .orderBy('createdAt', 'desc')
                .startAfter(last)
                .limit(20)
        } else {
            query = firebase.firestore().collection('movies')
                .where('userId', '==', userId)
                .orderBy('createdAt', 'desc')
                .limit(20)
        }
        query.get()
            .then((snapshot) => {
                dispatch(getMyMovieListSuccess(snapshot.docs, last));
                console.log(snapshot.doc)
                
            })
            .catch((error) => {
                console.log(error);
                dispatch(getMyMovieListFailed(error));
            })
    }
}

const initialState = {
    list: [],
    isLoading: false,
    isSuccess: false,
    isFailed: false,
    error: null,
}

export default function myMovieListReducer(state = initialState, action) {
    switch (action.type) {
        case GET_MY_MOVIE_LIST_REQUEST:
            return Object.assign({}, state, {
                isLoading: true,
                isSuccess: false,
                isFailed: false,
                error: null,
            })
        case GET_MY_MOVIE_LIST_SUCCESS:
            return Object.assign({}, state, {
                isLoading: false,
                isSuccess: true,
                isFailed: false,
                list: action.payload.last ? [...state.list, ...action.payload.list] : [...action.payload.list]
            })
        case GET_MY_MOVIE_LIST_FAILED:
            return Object.assign({}, state, {
                isLoading: false,
                isSuccess: false,
                isFailed: true,
                error: action.payload
            })
        case DELETE_MY_MOVIE_SUCCESS:
             return Object.assign({}, state, {
                isLoading: false,
                isSuccess: true,
                isFailed: false,
                list: state.list.filter((doc)=> doc.id !== action.payload)
            })
        default:
            return state;
    }
}