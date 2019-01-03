import React, { Component } from 'react';
import { List, InputItem, Button, WhiteSpace } from 'antd-mobile';
import { createForm } from 'rc-form';
import { connect } from 'dva';
class Login extends Component {
    async submit() {
        let { form, dispatch } = this.props,
            { getFieldValue } = form,
            username = getFieldValue('username'),
            password = getFieldValue('password');
        dispatch({ type: 'user/login', data: { username, password } })
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

export default connect()(createForm()(Login))