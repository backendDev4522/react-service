import React, { Component } from 'react'
import { Card, Icon, Button } from 'semantic-ui-react'
class MyMovieItem extends Component {

    static defaultProps = {
        id:null,
        onClick:null,
        imageUrl: '',
        name: '',
        openedAt: '',
        description: '',
        likeCnt: '',
    }

    onClick = () => {
        if(this.props.onClick && this.props.id){
        this.props.onClick(this.props.id);
    }
    }
    render() {
        const {
            imageUrl,
            name,
            openedAt,
            description,
            likeCnt,
        } = this.props;
        //'url(' + imageUrl + ')'
        //`url(${imageUrl})`
        return (
            <Card>
                <div style={{
                    height: 300,
                    backgroundImage: `url(${imageUrl})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat"
                }}>

                </div>
                {/* <Image style={{height:200, overflow:'hidden'}} src={imageUrl} wrapped ui={false} /> */}
                <Card.Content>
                    <Card.Header>{name}</Card.Header>
                    <Card.Meta>
                        <span className='date'>
                            {openedAt}
                        </span>
                    </Card.Meta>
                    <Card.Description>
                        {description}
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Button onClick={this.onClick}>수정하기</Button>
                    <Button>삭제하기</Button>
                </Card.Content>
            </Card>

        )
    }
}
export default MyMovieItem;
