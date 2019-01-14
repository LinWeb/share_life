import React, { Component } from 'react';
import { Card, Grid, Button } from 'antd-mobile';
import { getDetailDate } from '../../../utils/filter'
import { Link } from 'dva/router';
import { connect } from 'dva'
import API from '../../../services/index'
class DynamicList extends Component {
    // state = {
    //     dynamicData: []
    // }
    async updateFollow(_id, is_followed) {
        let res = await API.UPDATE_FOLLOW({ _id, is_followed })
    }
    async updateLike(_id, is_liked) {
        let _author = this.props.userId
        let res = await API.DYNAMIC_UPDATE_LIKE({ _id, _author, is_liked })
        // if (res) {
        //     // let likes_count = res.data.count
        //     // this.updateDynamicData({ likes_count })
        // }
    }
    // updateDynamicData({ likes_count }) {

    // }
    render() {
        let { data, userId } = this.props
        let noData = <div style={{ backgroundColor: '#fff', textAlign: 'center', height: "634px", lineHeight: '634px' }}>暂无数据</div>

        return (
            <div >
                {!data.length ? noData :
                    data.map((item, key) =>
                        <Card full key={key} style={{ marginBottom: '15px' }}>
                            <Card.Header
                                title={<div>{item._author.username}</div>}
                                thumb={<div style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '6px', border: '1px solid #d0cece' }}><img style={{ width: '100%', height: '100%' }} src={item._author.head_img_url} /></div>}
                                extra={item._author._id === userId ? null : <Button type={item.is_followed ? 'ghost' : 'warning'} inline size="small" style={{ marginRight: '4px' }}
                                    onClick={() => { this.updateFollow(item._author._id, !item.is_followed) }}>{item.is_followed ? '取消关注' : '关注'}</Button>}
                            />
                            <Card.Body>
                                <div style={{ marginBottom: '5px' }}>{item.content}</div>
                                <Grid data={item.images}
                                    columnNum={3}
                                    hasLine={false}
                                    activeStyle={false}
                                    renderItem={dataItem => (
                                        <div style={{ padding: '0px 5px' }}>
                                            <img src={dataItem} style={{ width: '100%', height: '100%' }} alt="" />
                                        </div>
                                    )}
                                />
                            </Card.Body>
                            <Card.Footer style={{ margin: '12px 0 5px' }}
                                content={getDetailDate(item.create_time)}
                                extra={<div>
                                    <span style={{ color: item.is_liked ? '#e94f4f' : '' }} onClick={() => { this.updateLike(item._id, !item.is_liked) }}>
                                        <span className='iconfont icon-dianzan' /> {item.likes_count}
                                    </span>
                                    {this.props.type ? null : <Link to={'/dynamic/id/' + item._id} style={{ marginLeft: '20px', color: '#888' }}><span className='iconfont icon-weibiaoti527' /> {item.comment_count}</Link>}
                                </div>} />
                        </Card>
                    )}
            </div>
        )
    }
}
let mapStateToProps = (state) => {
    return {
        userId: state.user.userId
    }
}
export default connect(mapStateToProps)(DynamicList)