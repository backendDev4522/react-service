import React, { Component } from 'react'
import {Grid } from 'semantic-ui-react'
import MovieItem from '../../component/movie/MovieItem'

class TestPage extends Component {
    render() {
        return (
            <Grid>
                <Grid.Column mobile={8} tablet={4} computer={4}>
                    <MovieItem
                    imageUrl=''
                    name="챔피언"
                    openedAt="2019.01.01"
                    description="마동석나옴"
                    likeCnt={10}                    
                    />
                </Grid.Column>
                <Grid.Column mobile={8} tablet={4} computer={4}>
                    <MovieItem
                    imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4b6LAMm0hl31tRorDkaxd19f-7CxmHgoGbo0Qd5p1zFZ_BZNxuA"
                    name="악인전"
                    openedAt="2019.01.01"
                    description="마동석나옴2"
                    likeCnt={10}                    
                    />
                </Grid.Column>
                <Grid.Column mobile={8} tablet={4} computer={4}>
                    <MovieItem
                    imageUrl=''
                    name="함정"
                    openedAt="2019.01.01"
                    description="마동석나옴"
                    likeCnt={10}                    
                    />
                </Grid.Column>
            </Grid>
        )
    }
}
export default TestPage;