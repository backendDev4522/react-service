import React, { Component } from 'react'
import MovieList from '../../component/movie/MovieList'
import {withRouter} from 'react-router-dom'
import ReactGA from 'react-ga'
class HomePage extends Component {

    componentDidMount(){
        console.log(this.props.location.pathname + this.props.location.search);
        ReactGA.pageview(this.props.location.pathname + this.props.location.search)

    }
    render() {
        return (
            <div>
                <MovieList />
            </div>

        )
    }
}

export default withRouter(HomePage);