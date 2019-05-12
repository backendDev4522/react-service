import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Button, Form, Message } from 'semantic-ui-react'
import {login} from '../../store/loginReducer'


 
class LoginForm extends Component {
    state = {
        email:'',
        password:'',
        message:'',
    }

    static getDerivedStateFromProps = (props) =>{
        const {error} = props;
        if(error){
            return {
                message:error.message,
            }
        } else {
            if(!this.state){
                return null;
            }
            const {message} = this.state;
            return{
                message:message
            }
        }
        return null;    
    }

    onHandleChange = (e) => {
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    onLogin = (e) => {
        /**
         * 이메일,비밀번호 입력했는지,* 비밀번호, 확인과 같은지,이용약관 눌렀는지.*/
        const {
            email,
            password,
        } = this.state;

        if(!email){
            this.setState({
                message:'이메일을 입력하세요'
            })
            return;
        }
        if(!password){
            this.setState({
                message:'비밀번호를 입력하세요'
            })
            return;
        }

        this.setState({
            message:''
        })

        this.props.login(email,password)

        //서버로 회원가입
    }

    render() {

        const { email, password, message } = this.state;
        const { isLoading } = this.props;
        return (
            <Form>
                <Form.Field>
                    <label>이메일</label>
                    <input placeholder='Email'name="email" value={email} onChange={this.onHandleChange} />
                </Form.Field>
                <Form.Field>
                    <label>비밀번호</label>
                    <input placeholder='Password' name="password" type="password" value={password} onChange={this.onHandleChange}/>
                </Form.Field>
                <Button type='submit' loading={isLoading} onClick={this.onLogin}>로그인</Button>
                { message?<Message content={message} />:null}


            </Form>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        isLoading:state.login.isLoading,
        error:state.login.error
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        login: (email, password) => dispatch(login(email, password))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(LoginForm);