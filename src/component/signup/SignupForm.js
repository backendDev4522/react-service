import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Button, Checkbox, Form, Message } from 'semantic-ui-react'
class SignupForm extends Component {
    state = {
        email:'',
        password:'',
        password2:'',
        terms:false,
        message:'',
    }

    onHandleChange = (e) => {
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    onCheckBoxHandleChange = (e) => {
        this.setState({
            terms:!this.state.terms,
        })
    }

    onSignup = (e) => {
        /**
         * 이메일,비밀번호 입력했는지,* 비밀번호, 확인과 같은지,이용약관 눌렀는지.*/
        const {
            email,
            password,
            password2,
            terms
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
        if(password !== password2){
            this.setState({
                message:'비밀번호가 일치하지 않습니다.'
            })
            return;
        }
        if(!terms){
            this.setState({
                message:'서비스 이용약관에 동의하세요'
            })
            return;
        }

        this.setState({
            message:''
        })

        //서버로 회원가입
    }

    render() {

        const {email, password, password2, terms, message} = this.state;
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
                <Form.Field>
                    <label>비밀번호 확인</label>
                    <input placeholder='Confirm password' name="password2" type="password" value={password2} onChange={this.onHandleChange}/>
                </Form.Field>
                <Form.Field>
                    <Checkbox label='서비스 이용약관' name="terms" checked={terms} onChange={this.onCheckBoxHandleChange} />
                </Form.Field>
                <Button type='submit' onClick={this.onSignup}>회원가입</Button>
                {
                    message?<Message content={message} />:null
                }
            </Form>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        
    }
}
const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SignupForm);