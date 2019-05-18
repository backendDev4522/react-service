import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Button, Form, Message } from 'semantic-ui-react'
import {updateDisplayName, displayNameValidationFailed} from '../../store/displayNameReducer'


 
class DisplayNameForm extends Component {
    state = {
       displayName:'',
    }

    onHandleChange = (e) => {
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    onUpdateDisplayName = (e) => {
        /**
         * 이메일,비밀번호 입력했는지,* 비밀번호, 확인과 같은지,이용약관 눌렀는지.*/
        const {
           displayName,
        } = this.state;

        if(!displayName){
             this.props.displayNameValidationFailed(new Error('이메일을 입력하세요'));
            return;
        }
        
         this.props.updateDisplayName(displayName);

        //서버로 회원가입
    }

    render() {

        const { displayName } = this.state;
        const { isLoading, error } = this.props;
        return (
            <Form>
                <Form.Field>
                    <label>닉네임</label>
                    <input placeholder='displayName'name="displayName" value={displayName} onChange={this.onHandleChange} />
                </Form.Field>
                <Button type='submit' loading={isLoading} onClick={this.onUpdateDisplayName}>닉네임 등록</Button>
                { error ? <Message content={error.message} />:null}
                

            </Form>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        isLoading:state.displayName.isLoading,
        error:state.displayName.error
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
       updateDisplayName: (displayName)=> dispatch(updateDisplayName(displayName)),
       displayNameValidationFailed: (error)=> dispatch(displayNameValidationFailed(error))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(DisplayNameForm);