import React, { Component } from 'react';
import styles from './user.css'
import { List, WhiteSpace, Button, DatePicker, Picker } from 'antd-mobile';
import { district } from 'antd-mobile-demo-data'
import { createForm } from 'rc-form';
import { connect } from 'dva'
import API from '../../services/index'
const Item = List.Item;
const Brief = Item.Brief;

class User extends Component {
    state = {
        userInfo: {}
    }
    logout = async () => {
        let { dispatch } = this.props
        dispatch({ type: 'user/logout' })
    }
    async getUserInfo() {
        // 测试接口
        let id = this.props.userId
        let res = await API.USER_INFO({ id })
        if (res) {
            this.setState(() => ({
                userInfo: res.data
            }))
        }
    }
    async updateUserInfo(data) {
        // 测试接口
        let res = await API.UPDATE_USER_INFO(data)
        if (res) {
            this.setState((prevState) => ({
                userInfo: { ...prevState.userInfo, ...data }
            }))
        }
    }
    componentWillMount() {
        this.getUserInfo()
    }
    render() {
        let { username, head_img_url, sign,
            dynamic_count, follows_count,
            fans_count, birthday, hometown, hobbies } = this.state.userInfo

        return (
            <div className={styles.user_container}>
                <List>
                    <Item
                        arrow="horizontal"
                        thumb={head_img_url}
                        multipleLine
                        onClick={() => { }}
                        className={styles.head_img}
                    >
                        {username} <Brief>{sign}</Brief>
                    </Item>
                </List>
                <WhiteSpace />
                <WhiteSpace />
                <List>
                    <Item extra={dynamic_count} arrow="horizontal" onClick={() => { }}>我的动态</Item>
                    <Item extra={follows_count} arrow="horizontal" onClick={() => { }}>我的关注</Item>
                    <Item extra={fans_count} arrow="horizontal" onClick={() => { }}>我的粉丝</Item>
                </List>
                <WhiteSpace />
                <WhiteSpace />
                <List>
                    <DatePicker
                        mode="date"
                        value={birthday ? new Date(birthday) : new Date()}
                        minDate={new Date(1900, 1, 1)}
                        maxDate={new Date()}
                        onChange={date => this.updateUserInfo({ birthday: date })}
                    >
                        <List.Item arrow="horizontal">出生日期</List.Item>
                    </DatePicker>
                    <Picker extra="请选择(可选)"
                        data={district}
                        title="Areas"
                        {...getFieldProps('district', {
                            initialValue: ['340000', '341500', '341502'],
                        })}
                        onOk={e => console.log('ok', e)}
                        onDismiss={e => console.log('dismiss', e)}
                    >
                        <List.Item arrow="horizontal">所在家乡</List.Item>
                    </Picker>
                    <Item extra={hometown} arrow="horizontal" onClick={() => { }}>所在家乡</Item>
                    <Item extra={hobbies} arrow="horizontal" onClick={() => { }}>兴趣爱好</Item>
                </List>
                <WhiteSpace />
                <WhiteSpace />
                <WhiteSpace />
                <div style={{ padding: '0 12px' }}>
                    <Button type="warning" onClick={this.logout}>退出</Button>
                </div>
            </div>
        )
    }
}

export default connect((state) => {
    return {
        userId: state.user.userId
    }
})(createForm(User))