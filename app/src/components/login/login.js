import React, { Component } from 'react';
import { List, InputItem, Button, WhiteSpace } from 'antd-mobile';
import { createForm } from 'rc-form';
import { connect } from 'dva';
import { Link } from 'dva/router';
class Login extends Component {
    async submit() {
        let { form, dispatch, location } = this.props,
            { getFieldValue, validateFields } = form,
            username = getFieldValue('username'),
            password = getFieldValue('password'),
            from = location.state ? location.state.from.pathname : '/';
        validateFields((error, value) => {
            console.log(11111, error, value);
        });
        // 采用插件来校验？
        dispatch({ type: 'user/login', data: { username, password }, from })
    }
    render() {
        let { form, history } = this.props,
            { getFieldProps } = form;
        console.log(getFieldProps('username'))
        return (
            <div className='register-container' style={{ padding: '0 10px', marginTop: '120px' }}>
                <List>
                    <InputItem
                        {...getFieldProps('username', {
                            initialValue: '',
                            rule: [{
                                type: 'string',
                                required: true,
                            }]
                        })}
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
                <WhiteSpace />
                <WhiteSpace />
                <WhiteSpace />
                <Button type="primary" onClick={() => this.submit()}>登录</Button>
                <WhiteSpace />
                <WhiteSpace />
                <Link to='/register' style={{ float: 'right', color: '#666', textDecoration: 'underline' }}>还没账号？去注册</Link>
            </div>
        )
    }
}

export default connect()(createForm()(Login))