import React, { Component } from 'react';
import { List, InputItem, Button, WhiteSpace } from 'antd-mobile';
import { createForm } from 'rc-form';
import API from '../../services/index'

class Register extends Component {
    async submit() {
        let { form, history } = this.props,
            { getFieldValue } = form,
            username = getFieldValue('username'),
            password = getFieldValue('password');
        let data = await API.REGISTER({ username, password })
        data && history.push('/login')
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