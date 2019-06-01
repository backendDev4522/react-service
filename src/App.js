import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import HomePage from './page/home/HomePage'
import LoginPage from './page/login/LoginPage'
import SignupPage from './page/signup/SignupPage'
import Header from './component/header/Header'
import { connect } from 'react-redux'
import DisplayNamePage from './page/displayname/DisplayNamePage'
import AddMoviePage from './page/addMovie/AddMoviePage'
import UpdateMoviePage from './page/updateMovie/updateMoviePage'
import TestPage from './page/test/Testpage'
import MyMovieListPage from './page/myMovieList/MyMovieListPags';

/** 라우팅
 * 
 * 
 * 
 * 
 * */
// 1
import {createBrowserHistory} from 'history'
import ReactGA from 'react-ga'
// 2
const history = createBrowserHistory();

// history가 바뀔 때마다 호출
history.listen((location, action) => {
  const url = location.pathname + location.search;
  ReactGA.pageview(url);

})


class App extends Component {

  render() {

    return (
      // 3
      <Router history={history}>
        <Header />
        <Route path="/" exact component={() => {
          if (this.props.user && this.props.user.displayName) {
            return <HomePage />
          } else if (this.props.user) {
            return <Redirect to="/display-name" />
          } else {
            return <Redirect to="/login" />
          }
        }} />

        <Route path="/my-movies" exact component={() => {
          if (this.props.user && this.props.user.displayName) {
            return <MyMovieListPage />
          } else if (this.props.user) {
            return <Redirect to="/display-name" />
          } else {
            return <Redirect to="/login" />
          }
        }} />


        <Route path="/movie/add" component={AddMoviePage} />

        <Route path="/movie/:movieId/update" component={UpdateMoviePage} />

        <Route path="/login" component={() => {
          if (this.props.user) {
            return <Redirect to="/" />
          } else {
            return <LoginPage />
          }

        }} />
        <Route path="/signup" component={() => {
          if (this.props.user) {
            return <Redirect to="/" />
          } else {
            return <SignupPage />
          }
        }} />

        <Route path="/display-name" component={() => {
          if (this.props.user && this.props.user.displayName) {
            return <Redirect to="/" />

          } else if (this.props.user) {
            return <DisplayNamePage />

          } else {
            return <Redirect to="/login" />
          }
        }} />

        <Route path="/test" component={TestPage} />
      </Router>
    )

  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  }
}


export default connect(mapStateToProps, null)(App);
