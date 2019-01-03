import React, { Component } from 'react';
import check_login from '../../check/check_login'
class User extends Component {
    render() {
        console.log(check_login())
        return (
            <div>
                User
            </div>
        )
    }
}

export default User