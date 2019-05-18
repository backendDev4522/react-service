import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Checkbox, Form, Message } from 'semantic-ui-react'
import { signup, singupValidationFailed } from '../../store/signupReducer'


class SignupForm extends Component {
    state = {
        email: '',
        password: '',
        password2: '',
        terms: false,
    }

    onHandleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onCheckBoxHandleChange = (e) => {
        this.setState({
            terms: !this.state.terms,
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

        if (!email) {
            this.props.singupValidationFailed(new Error('이메일을 입력하세요'))
            return;
        }
        if (!password) {
            this.props.singupValidationFailed(new Error('패스워드를 입력하세요'))
            return;
        }
        if (password !== password2) {
            this.props.singupValidationFailed(new Error('비밀번호가 일치하지 않습니다.'))
            return;
        }

        if (!terms) {
            this.props.singupValidationFailed(new Error('약관에 동의하세요'))
            return;
        }

        this.props.signup(email, password)
        //서버로 회원가입
    }

    render() {

        const { email, password, password2, terms } = this.state;
        const { isLoading, error } = this.props;
        return (
            <Form>
                <Form.Field>
                    <label>이메일</label>
                    <input placeholder='Email' name="email" value={email} onChange={this.onHandleChange} />
                </Form.Field>
                <Form.Field>
                    <label>비밀번호</label>
                    <input placeholder='Password' name="password" type="password" value={password} onChange={this.onHandleChange} />
                </Form.Field>
                <Form.Field>
                    <label>비밀번호 확인</label>
                    <input placeholder='Confirm password' name="password2" type="password" value={password2} onChange={this.onHandleChange} />
                </Form.Field>
                <Form.Field>
                    <Checkbox label='서비스 이용약관' name="terms" checked={terms} onChange={this.onCheckBoxHandleChange} />
                </Form.Field>
                <Button type='submit' loading={isLoading} onClick={this.onSignup}>회원가입</Button>
                {
                    error ? <Message content={error.message} /> : null
                }
            </Form>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.signup.isLoading,
        error: state.signup.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signup: (email, password) => dispatch(signup(email, password)),
        singupValidationFailed: (error) => dispatch(singupValidationFailed(error))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);