import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import { connect } from 'react-redux'
import { getMyMovieList } from '../../store/myMovieListReducer'
import MyMovieItem from '../movie/MyMovieItem'
import { Grid, Button } from 'semantic-ui-react';


class MyMovieList extends Component {

    componentDidMount() {
        this.props.getMyMovieList(null);
    }


    onLoadMore = () =>{
        if(this.props.list.length){
            this.props.getMyMovieList(this.props.list[this.props.list.length - 1]);
        } else { 
            this.props.getMyMoviewList(null);
        }
    }

    onItemClick = (id) => {
        console.log('onItemClick', id);
        this.props.history.push(`/movie/${id}/update`)
    }
    render() {
        const { list } = this.props;
        const items = list.map( (doc) => {
      

            const id = doc.id;
            const data = doc.data();
            const {name, openedAt, director, description, imageURL} = data;
            return <Grid.Column key={id} mobile={8} tablet={5} computer={4}>
                <MyMovieItem 
                id={id}
                imageUrl={imageURL}
                key={id}
                name={name}
                openedAt={openedAt}
                director={director}
                description={description}
                likeCnt={0}
                onClick={this.onItemClick}
            />
            </Grid.Column >
        })
    return(
            <Grid>
                {items}
              <Grid.Row centered>
                <Button onClick={this.onLoadMore}>더 불러오기</Button>
        
              </Grid.Row>
            </Grid >

        )
    }
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.myMovieList.isLoading,
        list: state.myMovieList.list,
        error: state.myMovieList.error,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getMyMovieList: (last) => dispatch(getMyMovieList(last))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MyMovieList));