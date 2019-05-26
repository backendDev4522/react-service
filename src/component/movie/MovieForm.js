import React, { Component } from 'react'
import { Grid, Form, Image } from 'semantic-ui-react'

class MovieForm extends Component {

    state = {
        name: '',
        director: '',
        openedAt: '',
        description: '',
        image: null,
    }
    
    static defaultProps = {
        name: '',
        director: '',
        openedAt: '',
        description: '',
        image: null,
    }

    componentDidMount() {
        const {
            image,
            name,
            director,
            openedAt,
            description,
        } = this.props;

        this.setState({
            image,
            name,
            director,
            openedAt,
            description,

        })
    }

    onHandleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    onImageChange = (e) => {
        if (!(e.target.files && e.target.files.length))
            return;

        console.log(e.target.files[0]);
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = () => {
            this.setState({
                image: {
                    file: file,
                    src: reader.result
                }
            })

        }
    }

    onImageDelete = () => {
        this.setState({
            image: null,
        })
    }

    onAddImage = () => {
        this.refs.image.click();
    }

    getValue = () => {
        const {
            name,
            description,
            director,
            openedAt,
            image
        } = this.state;
        return {
            name,
            description,
            director,
            openedAt,
            image,

        }
    }
    render() {
        const { name, director, openedAt, description, image } = this.state;

        return (
            <div>
                <Form>
                    <Grid.Row>
                        <Grid.Column mobile={16} tablet={8} computer={8}>
                            <input ref='image' type='file' style={{ display: 'none' }} onChange={this.onImageChange} />
                            <Form.Button fluid onClick={this.onAddImage}>이미지 등록</Form.Button>
                            {image ?
                                <Image src={image.src} style={{ cursor: 'pointer' }} onClick={this.onImageDelete} /> :
                                null}
                        </Grid.Column>
                        <Grid.Column mobile={16} tablet={8} computer={8}>
                            <Form.Input name="name" label="영화 제목" placeholder="영화 제목" value={name} onChange={this.onHandleChange} />
                            <Form.Input name="director" label="감독" placeholder="감독" value={director} onChange={this.onHandleChange} />
                            <Form.Input name="openedAt" label="개봉일" placeholder="개봉일" value={openedAt} onChange={this.onHandleChange} />
                            <Form.TextArea name="description" label="설명" placeholder="설명" value={description} onChange={this.onHandleChange} />
                        </Grid.Column>
                    </Grid.Row>
                </Form>
            </div>
        )
    }
}


export default MovieForm;