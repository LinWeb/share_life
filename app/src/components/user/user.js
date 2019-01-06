import React, { Component } from 'react';
import styles from './user.css'
import { List, WhiteSpace, Button } from 'antd-mobile';
import { connect } from 'dva'
const Item = List.Item;
const Brief = Item.Brief;

class User extends Component {
    logout = async () => {
        let { dispatch } = this.props
        // let res = await API.LOGOUT()
        // if (res) {
        //     if (res.status === 1) {
        //         history.push('/login')
        //     }
        // }
        dispatch({ type: 'user/logout' })
    }
    render() {
        return (
            <div className={styles.user_container}>
                <List>
                    <Item
                        arrow="horizontal"
                        thumb="https://via.placeholder.com/50"
                        multipleLine
                        onClick={() => { }}
                        className={styles.head_img}
                    >
                        小强 <Brief>享受生活，分享点滴！</Brief>
                    </Item>
                </List>
                <WhiteSpace />
                <WhiteSpace />
                <WhiteSpace />
                <List>
                    <Item extra="34" arrow="horizontal" onClick={() => { }}>我的资料</Item>
                    <Item extra="12" arrow="horizontal" onClick={() => { }}>我的动态</Item>
                    <Item extra="12" arrow="horizontal" onClick={() => { }}>我的关注</Item>
                    <Item extra="34" arrow="horizontal" onClick={() => { }}>我的粉丝</Item>
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

export default connect()(User)