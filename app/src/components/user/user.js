import React, { Component } from 'react';
import styles from './user.css'
import { List, WhiteSpace, Button } from 'antd-mobile';
import { connect } from 'dva'
import { Link } from 'dva/router'
const Item = List.Item;
const Brief = Item.Brief;


class User extends Component {
    logout = async () => {
        let { dispatch } = this.props
        dispatch({ type: 'user/logout' })
    }
    render() {
        let { username, head_img_url, sign,
            dynamic_count, follows_count,
            fans_count, sex } = this.props.userInfo
        return (
            <div className={styles.user_container}>
                <List>
                    <Link to='/user/profile'>
                        <Item
                            arrow="horizontal"
                            thumb={head_img_url}
                            multipleLine
                            onClick={() => { }}
                            className={styles.head_img}
                        >
                            {username}
                            &nbsp;
                        {sex ?
                                <span className="iconfont icon-nan" style={{ color: 'rgb(51, 163, 244)' }} />
                                :
                                <span className="iconfont icon-nv" style={{ color: 'rgb(255, 77, 148)' }} />
                            }
                            <Brief>{sign}</Brief>
                        </Item>
                    </Link>
                </List>
                <WhiteSpace />
                <WhiteSpace />
                <List>
                    <Link to='/user/dynamic'>
                        <Item extra={dynamic_count} arrow="horizontal" onClick={() => { }}>我的动态</Item>
                    </Link>
                    <Item extra={follows_count} arrow="horizontal" onClick={() => { }}>我的关注</Item>
                    <Item extra={fans_count} arrow="horizontal" onClick={() => { }}>我的粉丝</Item>
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
        userId: state.user.userId,
        userInfo: state.user.userInfo,
    }
})(User)