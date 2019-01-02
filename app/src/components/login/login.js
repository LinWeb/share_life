import React, { Component } from 'react';
import { List, InputItem, Button, WhiteSpace } from 'antd-mobile';
import { createForm } from 'rc-form';
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3000/';

axios.interceptors.request.use((config) => {
    config.withCredentials = true
    return config
}, (error) => {
    return Promise.reject(error)
})
class Login extends Component {
    submit() {
        const { getFieldValue } = this.props.form;
        let username = getFieldValue('username'),
            password = getFieldValue('password');

        axios.post('/user/login', {
            username,
            password
        }).then(function (response) {
            console.log(response);
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
                    >密码</InputItem>
                </List>
                <WhiteSpace />
                <Button type="primary" onClick={() => this.submit()}>登录</Button>
            </div>
        )
    }
}

export default createForm()(Login)