import React, { Component } from 'react';
import { connect } from 'dva'
import { Link } from 'dva/router'
import { List, Button } from 'antd-mobile'
import API from '../../../services/index'
import RefreshContainer from '../refresh_container/refresh_container'
const Item = List.Item
const Brief = Item.Brief;
class UserList extends Component {
    state = {
        userData: [],
        page: 0, // 页码
        page_num: 1, // 总页数
        loading: false,
    }
    async getUserData() {
        let { type, id } = this.props.match.params
        let params = { _id: id }
        let res = {}
        let userData = []
        let { page, page_num } = this.state
        page += 1;
        if (page > page_num) {
            this.setState(() => ({
                loading: false,
            }))
            return;
        }
        params = { ...params, page }
        userData = [...this.state.userData]
        if (type === 'follows') {
            // 获取关注数据
            res = await API.GET_FOLLOWS(params)
        } else {
            // 获取粉丝数据
            res = await API.GET_FANS(params)
        }
        if (res) {
            userData = [...userData, ...res.data]
            this.setState(() => ({
                userData,
                page: res.pagination.page,
                page_num: res.pagination.page_num,
                loading: false,
            }))
        }
    }
    async updateFollow(active_id, passive_id, is_followed) {
        let res = await API.UPDATE_FOLLOW({ active_id, passive_id, is_followed })
        if (res) {
            let userData = this.state.userData.map(item => {
                let { is_followed } = item
                if (item._id === passive_id) {
                    is_followed = !is_followed
                }
                return { ...item, is_followed }
            });
            userData = userData.filter(item => item._id !== active_id)
            this.setState(() => ({
                userData
            }))
        }
    }
    getRightBtn(item) {
        let { userId } = this.props
        let { type, id } = this.props.match.params
        if (userId === id) {
            if (type === 'follows') {
                return item._id === userId ? null : <Button type={item.is_followed ? 'ghost' : 'warning'} inline size="small" style={{ marginRight: '4px' }}
                    onClick={() => { this.updateFollow(userId, item._id, !item.is_followed) }}>{item.is_followed ? '取消关注' : '关注'}</Button>
            } else {
                return <Button type='ghost' inline size="small" style={{ marginRight: '4px' }}
                    onClick={() => { this.updateFollow(item._id, userId, false) }}>移除粉丝</Button>
            }
        } else {
            return null
        }
    }
    UNSAFE_componentWillMount() {
        this.getUserData()
    }
    render() {
        let { userData, loading } = this.state
        return (
            <RefreshContainer
                onRefresh={() => { this.getUserData() }}
                disabledTopRefresh
                loading={loading}
            >
                <List>
                    {userData.map((item, key) =>
                        <Item
                            key={key}
                            extra={this.getRightBtn(item)}
                            thumb={
                                <div style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '6px', border: '1px solid #d0cece', overflow: 'hidden' }}>
                                    <Link to={{
                                        pathname: `/user/id/${item._id}`,
                                        search: `title=${item.nickname}的主页`
                                    }}>
                                        <img style={{ width: '100%', height: '100%' }} src={item.head_img_url} alt='' />
                                    </Link>
                                </div>
                            }
                            multipleLine
                            onClick={() => { }}
                        >
                            {item.nickname} &nbsp;
                            {item.sex ?
                                <span className="iconfont icon-nan" style={{ color: 'rgb(51, 163, 244)' }} />
                                : <span className="iconfont icon-nv" style={{ color: 'rgb(255, 77, 148)' }} />
                            }
                            <Brief>{item.sign}</Brief>
                        </Item>
                    )}
                </List>
            </RefreshContainer>
        )
    }
}

export default connect((state) => {
    return {
        userId: state.user.userId
    }
})(UserList) 