import React from 'react';
import ReactDOM from 'react-dom';
import firebase from "firebase";
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'semantic-ui-css/semantic.min.css'
import {configureStore} from './store/index'
import {Provider} from 'react-redux'
import {auth} from './store/authReducer'
import ReactGA from 'react-ga';


ReactGA.initialize('UA-141188531-1');

var config = {
    apiKey: "AIzaSyDuleCznnA-Rppk2twoeeBS2lZ8tAKs_nA",
    authDomain: "react-board-6c9f9.firebaseapp.com",
    databaseURL: "https://react-board-6c9f9.firebaseio.com",
    projectId: "react-board-6c9f9",
    storageBucket: "react-board-6c9f9.appspot.com",
    messagingSenderId: "324400022113",
    appId: "1:324400022113:web:257336cdf4c05417"
  };

firebase.initializeApp(config);

const store = configureStore();

store.dispatch(auth());
ReactDOM.render(
<Provider store={store}>
    <App />
</Provider>
,document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
