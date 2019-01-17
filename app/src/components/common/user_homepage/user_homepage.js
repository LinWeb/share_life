import React, { Component } from 'react';
import { List, WhiteSpace, Flex, Button } from 'antd-mobile';
import styles from './user_homepage.css'
import { connect } from 'dva'
import { Link, withRouter } from 'dva/router'
import moment from 'moment'
import { district } from 'antd-mobile-demo-data'
import API from '../../../services/index'

const Item = List.Item;
const Brief = Item.Brief;

class UserHomepage extends Component {
    UNSAFE_componentWillMount() {
        let { dispatch, match } = this.props,
            id = match.params.id;
        dispatch({ type: 'user/getUserInfoAction', id })
    }
    async updateFollow(active_id, passive_id, is_followed) {
        let res = await API.UPDATE_FOLLOW({ active_id, passive_id, is_followed })
        if (res) {
            let { userInfo, dispatch } = this.props
            dispatch({ type: 'user/updateUserInfo', userInfo: { ...userInfo, is_followed } })
        }
    }
    getRightBtn(id, is_followed) {
        let { userId } = this.props
        if (id) {
            return id === userId ? null
                : <Button type={is_followed ? 'ghost' : 'warning'} inline size="small" style={{ marginRight: '4px' }}
                    onClick={() => { this.updateFollow(userId, id, !is_followed) }}   >{is_followed ? '取消关注' : '关注'}</Button>
        } else {
            return null
        }
    }
    render() {
        let { nickname, head_img_url, sign, is_followed,
            dynamic_count, follows_count,
            fans_count, sex, birthday, address, hobbies, create_time } = this.props.userInfo
        let { hobbiesData, history, match, userId } = this.props,
            id = match.params.id;

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
            <div className="userHomepage">
                <List>
                    <Item
                        arrow={!id && "horizontal"}
                        thumb={head_img_url}
                        multipleLine
                        extra={this.getRightBtn(id, is_followed)}
                        onClick={() => { !id && history.push('/user/profile') }}
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
                    <Item>
                        <Flex style={{ textAlign: 'center', fontSize: '14px', lineHeight: '12px' }}>
                            <Flex.Item >
                                <Link to={{
                                    pathname: `/user/dynamics/id/${id || userId}`,
                                    search: 'title=动态',
                                }}>
                                    <p>动态</p>
                                    <p>{dynamic_count}</p>
                                </Link>
                            </Flex.Item>
                            <Flex.Item>
                                <Link to={{
                                    pathname: `/user/follows/id/${id || userId}`,
                                    search: 'title=关注',
                                }}>
                                    <p>关注</p>
                                    <p>{follows_count}</p>
                                </Link>
                            </Flex.Item>
                            <Flex.Item>
                                <Link to={{
                                    pathname: `/user/fans/id/${id || userId}`,
                                    search: 'title=粉丝',
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
                        <div style={{ color: '#666', fontSize: '16px', paddingBottom: '22px' }}>
                            <p>创建时间：{moment(create_time).format('YYYY-MM-DD')}</p>
                            <p>出生日期：{birthday}</p>
                            <p>所在家乡：{hometown}</p>
                            <div>兴趣爱好：{hobbiesData.map(({ value, label }) => (
                                hobbies && !hobbies.includes(value) ? null :
                                    <span key={value} style={{
                                        marginRight: '10px',
                                        textAlign: 'center',
                                        padding: '3px 15px',
                                        color: '#108ee9',
                                        border: '1px solid #108ee9',
                                        borderRadius: '3px',
                                        fontSize: '14px',
                                    }}>
                                        {label}
                                    </span>
                            ))}</div>
                        </div>
                    </Item>
                </List>
            </div>
        )
    }
}

export default withRouter(connect((state) => {
    let { userId, userInfo, hobbiesData } = state.user
    return {
        userId,
        userInfo,
        hobbiesData
    }
})(UserHomepage))