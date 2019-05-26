import React, { Component } from 'react'
import AddMovie from '../../component/movie/AddMovie'
import { Grid } from 'semantic-ui-react';
class AddMoviePage extends Component {

    render() {

        return (
            <Grid centered>
                <Grid.Column mobile={15} tablet={12} computer={10}>
                    <AddMovie />
                </Grid.Column>
            </Grid>)

    }
}



export default AddMoviePage;