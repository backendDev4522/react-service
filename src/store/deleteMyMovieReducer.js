import firebase from 'firebase'
import {getMyMovieList} from './myMovieListReducer'
import { DELETE_MY_MOVIE_REQUEST , DELETE_MY_MOVIE_SUCCESS, DELETE_MY_MOVIE_FAILED } from './types'


function deleteMyMovieRequest() {
    return {
        type: DELETE_MY_MOVIE_REQUEST
    }
}

function deleteMyMovieSuccess(id) {
    return {
        type: DELETE_MY_MOVIE_SUCCESS,
        payload:id
        }
}


function deleteMyMovieFailed(error) {
    return {
        type: DELETE_MY_MOVIE_FAILED,
        payload: error,
    }
}

export function deleteMyMovie(movieId) {
    return (dispatch, getState) => {
        dispatch(deleteMyMovieRequest());
        // const userId = getState().auth.user.uid;

        // movieId 데이터를 가져옴

        //userId가 로그인한 userId인지 확인

        //맞으면 삭제

        //아니면 권한올 발생

        firebase.firestore().collection('movies').doc(movieId)
        .delete()
        .then(()=>{
            dispatch(deleteMyMovieSuccess(movieId));
            dispatch(getMyMovieList());
            // dispatch(getMyMovieList())
        }).catch((error)=>{
            dispatch(deleteMyMovieFailed(error))
        })

        





     
    }
}

const initialState = {
    isLoading: false,
    isSuccess: false,
    isFailed: false,
    error: null,
}

export default function deleteMyMovieReducer(state = initialState, action) {
    switch (action.type) {
        case DELETE_MY_MOVIE_REQUEST:
            return Object.assign({}, state, {
                isLoading: true,
                isSuccess: false,
                isFailed: false,
                error: null,
            })
        case DELETE_MY_MOVIE_SUCCESS:
            return Object.assign({}, state, {
                isLoading: false,
                isSuccess: true,
                isFailed: false,                
            })
        case DELETE_MY_MOVIE_FAILED:
            return Object.assign({}, state, {
                isLoading: false,
                isSuccess: false,
                isFailed: true,
                error: action.payload
            })
        default:
            return state;
    }
}