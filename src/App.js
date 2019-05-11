import React,{Component} from 'react';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom'
import HomePage from './page/home/HomePage'
import LoginPage from './page/login/LoginPage'
import SignupPage from './page/signup/SignupPage'
import Header from './component/header/Header'
import {connect} from 'react-redux'


/** 라우팅
 * /
 * /login
 * /signup
 * 
 * */



class App extends Component {

  render(){

      return(
          <Router>
            <Header/>  
            <Route path="/" exact component={()=>{
              if(this.props.user){
                return <HomePage/>
              } else {
                return <Redirect to="/login"/>
              }
              
            }} />
            <Route path="/login" component={LoginPage}></Route>
            <Route path="/signup" component={SignupPage}></Route>
          </Router>
      )

  }
}

const mapStateToProps = (state) =>{
    return {
      user:state.auth.user
    }
}


export default connect(mapStateToProps, null)(App);
