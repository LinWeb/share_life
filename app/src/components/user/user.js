import React, { Component } from 'react';
import styles from './user.css'
import { List, WhiteSpace, Button, Tag, Flex } from 'antd-mobile';
import { connect } from 'dva'
import { Link } from 'dva/router'
import moment from 'moment'
import { district } from 'antd-mobile-demo-data'

const Item = List.Item;
const Brief = Item.Brief;

console.log(district)
class User extends Component {
    logout = async () => {
        let { dispatch } = this.props
        dispatch({ type: 'user/logoutAction' })
    }
    render() {
        let { nickname, head_img_url, sign,
            dynamic_count, follows_count,
            fans_count, sex, birthday, address, hobbies, create_time } = this.props.userInfo
        let { hobbiesData } = this.props
        birthday = moment(birthday).format('YYYY-MM-DD');
        let hometown = ''
        if (address) {
            district.forEach(item1 => {
                if (address[0] === item1.value) {
                    hometown += item1.label;
                    item1.children.forEach(item2 => {
                        if (address[1] === item2.value) {
                            hometown += ' ' + item2.label;
                            item2.children.forEach(item3 => {
                                if (address[2] === item3.value) {
                                    hometown += ' ' + item3.label;
                                }
                            })
                        }
                    })
                }
            })
        }

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
                            {nickname}
                            &nbsp;
                            {sex ?
                                <span className="iconfont icon-nan" style={{ color: 'rgb(51, 163, 244)' }} />
                                : <span className="iconfont icon-nv" style={{ color: 'rgb(255, 77, 148)' }} />
                            }
                            <Brief>{sign}</Brief>
                        </Item>
                    </Link>
                    <Item>
                        <Flex style={{ textAlign: 'center', fontSize: '14px', lineHeight: '12px' }}>
                            <Flex.Item >
                                <Link to='/user/dynamics'>
                                    <p>动态</p>
                                    <p>{dynamic_count}</p>
                                </Link>
                            </Flex.Item>
                            <Flex.Item>
                                <Link to={{
                                    pathname: `/user/follows/id/${this.props.userId}`,
                                    search: 'title=我的关注',
                                }}>
                                    <p>关注</p>
                                    <p>{follows_count}</p>
                                </Link>
                            </Flex.Item>
                            <Flex.Item>
                                <Link to={{
                                    pathname: `/user/fans/id/${this.props.userId}`,
                                    search: 'title=我的粉丝',
                                }}>
                                    <p>粉丝</p>
                                    <p>{fans_count}</p>
                                </Link>
                            </Flex.Item>
                        </Flex>
                    </Item>
                </List>
                <WhiteSpace />
                <List>
                    <Item>
                        <div style={{ color: '#666', fontSize: '16px' }}>
                            <p>创建时间：{moment(create_time).format('YYYY-MM-DD')}</p>
                            <p>出生日期：{birthday}</p>
                            <p>所在家乡：{hometown}</p>
                            <p>兴趣爱好：{hobbiesData.map(({ value, label }) => (
                                hobbies && !hobbies.includes(value) ? null :
                                    <Tag selected key={value} style={{ marginRight: '10px' }}>{label}</Tag>
                            ))}</p>
                        </div>
                    </Item>
                </List>
                <WhiteSpace />
                <WhiteSpace />
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
    let { userId, userInfo, hobbiesData } = state.user
    return {
        userId,
        userInfo,
        hobbiesData
    }
})(User)