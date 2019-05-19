import firebase from 'firebase'

const UPDATE_USER = 'UPDATE_USER'
export const updateUser = (firebaseUser) => {
    const newUser = new User(firebaseUser);
    return {
        type:UPDATE_USER,
        payload:newUser,
    }
}

class User {
    constructor(firebaseUser){
        
        this.displayName = firebaseUser.displayName;
        this.email = firebaseUser.email;
        this.emailVerified = firebaseUser.emailVerified;
        this.photoURL = firebaseUser.photoURL;
        this.isAnonymous = firebaseUser.isAnonymous;
        this.uid = firebaseUser.uid;
        this.providerData = firebaseUser.providerData;
    }
}


export const auth = () => {
    return (dispatch) => {
    firebase.auth().onAuthStateChanged(function(firebaseUser) {
        if (firebaseUser) {
          dispatch(updateUser(firebaseUser))
      
        } else {
            dispatch(updateUser(null));
        }
      });
    }
}

const initailState = {
    user: null,

}


export default function authReducer(state = initailState, action) {
    switch (action.type) {
        case UPDATE_USER:
            return Object.assign({},state,{
                user: action.payload,
            })

        default:
            return state;
    }
}