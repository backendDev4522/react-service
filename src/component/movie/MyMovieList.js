import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import { connect } from 'react-redux'
import { getMyMovieList } from '../../store/myMovieListReducer'
import MyMovieItem from '../movie/MyMovieItem'
import { Grid, Button } from 'semantic-ui-react';
import {deleteMyMovie} from '../../store/deleteMyMovieReducer'


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

    onItemUpdateClick = (id) => {
        console.log('onItemUpdateClick', id);
        this.props.history.push(`/movie/${id}/update`)
    }

    onItemDeleteClick = (id) => {
        console.log('delete id : ', id);
        this.props.deleteMyMovie(id);
    

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
                onUpdateClick={this.onItemUpdateClick}
                onDeleteClick={this.onItemDeleteClick}
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
        getMyMovieList: (last) => dispatch(getMyMovieList(last)),
        deleteMyMovie: (id) => dispatch(deleteMyMovie(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MyMovieList));