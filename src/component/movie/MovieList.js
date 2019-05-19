import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getMovieList } from '../../store/movieListReducer'
import MovieItem from '../movie/MovieItem'
import { Grid } from 'semantic-ui-react';

class MovieList extends Component {

    componentDidMount() {
        this.props.getMovieList();
    }

    render() {
        const { list } = this.props;
        const items = list.map( (item) => {
            const { id } = item;
            const { name, openedAt, description, director } = item.data();
            return <Grid.Column>
                <MovieItem mobile={8} tablet={5} computer={4}
                key={id}
                name={name}
                openedAt={openedAt}
                director={director}
                description={description}
                likeCnt={0}
            />
            </Grid.Column>
        })
        return (
            <Grid>
                {items}
            </Grid>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.movieList.isLoading,
        list: state.movieList.list,
        error: state.movieList.error,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getMovieList: () => dispatch(getMovieList())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieList);