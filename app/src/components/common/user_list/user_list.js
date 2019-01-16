import React, { Component } from 'react';
import { connect } from 'dva'
import { List, Button } from 'antd-mobile'
import API from '../../../services/index'
const Item = List.Item
const Brief = Item.Brief;
class UserList extends Component {
    state = {
        userData: []
    }
    async getUserData() {
        let type = this.props.match.params.type
        let res = {}
        if (type === 'follows') {
            // 获取关注数据
            res = await API.GET_FOLLOWS({})
        } else {
            // 获取粉丝数据
            res = await API.GET_FANS({})
        }

        if (res) {
            this.setState(() => ({
                userData: res.data
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
        let type = this.props.match.params.type
        if (type === 'follows') {
            return item._id === userId ? null : <Button type={item.is_followed ? 'ghost' : 'warning'} inline size="small" style={{ marginRight: '4px' }}
                onClick={() => { this.updateFollow(userId, item._id, !item.is_followed) }}>{item.is_followed ? '取消关注' : '关注'}</Button>
        } else {
            return <Button type='ghost' inline size="small" style={{ marginRight: '4px' }}
                onClick={() => { this.updateFollow(item._id, userId, false) }}>移除粉丝</Button>
        }
    }
    UNSAFE_componentWillMount() {
        this.getUserData()
    }
    render() {
        let { userData } = this.state
        return (
            <div>
                <List>
                    {userData.map((item, key) =>
                        <Item
                            key={key}
                            extra={this.getRightBtn(item)}
                            thumb={<div style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '6px', border: '1px solid #d0cece', overflow: 'hidden' }}>
                                <img style={{ width: '100%', height: '100%' }} src={item.head_img_url} alt='' /></div>}
                            multipleLine
                            onClick={() => { }}
                        >
                            {item.nickname} <Brief>{item.sign}</Brief>
                        </Item>
                    )}
                </List>
            </div>
        )
    }
}

export default connect((state) => {
    return {
        userId: state.user.userId
    }
})(UserList) 