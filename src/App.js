import React,{Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import HomePage from './page/home/HomePage'
import LoginPage from './page/login/LoginPage'
import SignupPage from './page/signup/SignupPage'
import Header from './component/header/Header'


/** 라우팅
 * /
 * /login
 * /signup
 * 
 * */



class App extends Component {

  render(){

      return(
        <div>
          
          <Router>
            <Header/>  
            <Route path="/" exact component={HomePage}></Route>
            <Route path="/login" component={LoginPage}></Route>
            <Route path="/signup" component={SignupPage}></Route>
          </Router>
          
        </div>
      )

  }
}




export default App;
