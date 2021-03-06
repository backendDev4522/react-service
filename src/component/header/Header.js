import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'
import { logout } from '../../store/logoutReducer'
import { connect } from 'react-redux'

class Header extends Component {

    
    onLogout = () => {
        this.props.logout();
    }
    render() {
        const {user} = this.props;
        if(user){
            return (
                <Menu inverted style={{borderRadius:0}}>
                    <Menu.Item header>
                        게시판
                    </Menu.Item>
                    <Menu.Item>
                        <Link to="/">영화목록</Link>
                    </Menu.Item>
                    <Menu.Item>
                        <Link to="/movie/add">영화추가</Link>
                    </Menu.Item>
                    <Menu.Item>
                        <Link to="/my-movies">내가 등록한 영화</Link>
                    </Menu.Item>

                    <Menu.Menu position="right">
                        <Menu.Item>
                            {user.displayName}
                        </Menu.Item >
                        <Menu.Item onClick={this.onLogout}>
                        로그아웃
                        </Menu.Item>
                    </Menu.Menu>
                </Menu>
    
            )
        } else {
            return (
                <Menu inverted style={{borderRadius:0}}>
                    <Menu.Item header>
                        게시판
                    </Menu.Item>
                    <Menu.Item>
                        <Link to="/">홈</Link>
                    </Menu.Item>
                    <Menu.Menu position="right">
                    
                        <Menu.Item>
                            <Link to="/login">로그인</Link>
                        </Menu.Item>
                        <Menu.Item>
                            <Link to="/signup">
                                회원가입
                            </Link>
                        </Menu.Item>
                    </Menu.Menu>
                </Menu>
    
            )
        }
       
    }
}
const mapStateToProps = (state) =>{
    return {
        user:state.auth.user,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(logout())
    }

}

export default connect(mapStateToProps,mapDispatchToProps)(Header);