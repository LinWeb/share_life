import React, { Component } from 'react';
import { List, InputItem, Button, WhiteSpace, Toast } from 'antd-mobile';
import { createForm } from 'rc-form';
import API from '../../services/index'
import { Link } from 'dva/router';

class Register extends Component {
    async submit() {
        let { form, history } = this.props,
            { getFieldValue } = form,
            username = getFieldValue('username'),
            password = getFieldValue('password'),
            rePassword = getFieldValue('rePassword');
        if (password === rePassword) {
            let data = await API.REGISTER({ username, password })
            data && history.push('/login')
        } else {
            Toast.fail('Inconsistency between new password and confirmation password', 1);
        }
    }
    render() {
        const { getFieldProps } = this.props.form;
        return (
            <div className='register-container' style={{ padding: '0 10px', marginTop: '120px' }}>
                <List>
                    <InputItem
                        {...getFieldProps('username')}
                        type="text"
                        placeholder="请输入新账号"
                    >新账号</InputItem>
                    <InputItem
                        {...getFieldProps('password')}
                        type="password"
                        placeholder="请输入新密码"
                    >新密码</InputItem>
                    <InputItem
                        {...getFieldProps('rePassword')}
                        type="password"
                        placeholder="请输入确认密码"
                    >确认密码</InputItem>
                </List>
                <WhiteSpace />
                <WhiteSpace />
                <WhiteSpace />
                <WhiteSpace />
                <Button type="primary" onClick={() => this.submit()}>注册</Button>
                <WhiteSpace />
                <WhiteSpace />
                <Link to='/login' style={{ float: 'right', color: '#666', textDecoration: 'underline' }}>已有账号？去登录</Link>
            </div>
        )
    }
}

export default createForm()(Register)