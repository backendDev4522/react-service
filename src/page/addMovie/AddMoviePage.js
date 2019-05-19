import React, {Component} from 'react'
import MovieForm from '../../component/movie/MovieForm'
import { Grid } from 'semantic-ui-react';
class AddMoviePage extends Component {

    render(){
        
        return(
        <Grid> 
         <MovieForm/>
         </Grid>)           
    
    }
}

        

export default AddMoviePage;