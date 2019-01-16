import React, { Component } from 'react';
import { Button } from 'antd-mobile';
import UserHomepage from '../common/user_homepage/user_homepage'
import { connect } from 'dva'

class User extends Component {
    logout = async () => {
        let { dispatch } = this.props
        dispatch({ type: 'user/logoutAction' })
    }
    render() {
        return (
            <div>
                <UserHomepage />
                <div style={{ padding: '0 12px', marginTop: '50px' }}>
                    <Button type="warning" onClick={this.logout}>退出</Button>
                </div>
            </div>
        )
    }
}

export default connect()(User)