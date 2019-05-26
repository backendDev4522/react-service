import React, { Component } from 'react'
import MovieList from '../../component/movie/MovieList'
import { Grid } from 'semantic-ui-react';
class HomePage extends Component {


    render() {
        return (
            <div>
                <MovieList />
            </div>

        )
    }
}

export default HomePage;