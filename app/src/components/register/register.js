import React, { Component } from 'react';
import { List, InputItem, Button, WhiteSpace } from 'antd-mobile';
import { createForm } from 'rc-form';
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3000/';
class Register extends Component {
    submit() {
        const { getFieldValue } = this.props.form;
        let username = getFieldValue('username'),
            password = getFieldValue('password');

        axios.post('/user/register', {
            username,
            password
        }).then(function (response) {
            // if(response.)
        }).catch(function (error) {
            console.log(error);
        });
    }
    render() {
        const { getFieldProps } = this.props.form;
        return (
            <div className='register-container' style={{ padding: '0 10px', marginTop: '120px' }}>
                <List>
                    <InputItem
                        {...getFieldProps('username')}
                        type="text"
                        placeholder="请输入账号"
                    >账号</InputItem>
                    <InputItem
                        {...getFieldProps('password')}
                        type="password"
                        placeholder="请输入密码"
                    >新密码</InputItem>
                    <InputItem
                        {...getFieldProps('rePassword')}
                        type="password"
                        placeholder="请输入确认密码"
                    >确认密码</InputItem>
                </List>
                <WhiteSpace />
                <Button type="primary" onClick={() => this.submit()}>注册</Button>
            </div>
        )
    }
}

export default createForm()(Register)