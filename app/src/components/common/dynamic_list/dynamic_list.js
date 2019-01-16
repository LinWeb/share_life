import React, { Component } from 'react';
import { Card, Grid, Button } from 'antd-mobile';
import { getDetailDate } from '../../../utils/filter'
import { Link } from 'dva/router';
import { connect } from 'dva'
import API from '../../../services/index'
import RefreshContainer from '../../common/refresh_container/refresh_container'

class DynamicList extends Component {
    state = {
        dynamicData: [],
        page: 0, // 页码
        page_num: 0, // 总页数
        loading: true
    }
    async updateFollow(passive_id, is_followed) {
        let { userId } = this.props
        let active_id = userId
        let res = await API.UPDATE_FOLLOW({ active_id, passive_id, is_followed })
        if (res) {
            let dynamicData = this.state.dynamicData.map(item => {
                let { is_followed } = item
                if (item._author._id === passive_id) {
                    is_followed = !is_followed
                }
                return { ...item, is_followed }
            });
            this.setState(() => ({
                dynamicData
            }))
        }
    }
    async updateLike(_id, is_liked) {
        let _author = this.props.userId
        let res = await API.DYNAMIC_UPDATE_LIKE({ _id, _author, is_liked })
        if (res) {
            let dynamicData = this.state.dynamicData.map(item => {
                let { likes_count, is_liked } = item
                if (item._id === _id) {
                    likes_count = res.data.count
                    is_liked = !is_liked
                }
                return { ...item, likes_count, is_liked }
            });
            this.setState(() => ({
                dynamicData
            }))
        }
    }
    async getDynamicData(isCover) {
        let { params } = this.props;
        let dynamicData = []

        this.setState(() => ({
            loading: true,
        }))
        if (!isCover) {
            // 请求下一页数据
            let { page, page_num } = this.state
            page += 1;
            if (page <= page_num) {
                params = { ...params, page }
                dynamicData = [...this.state.dynamicData]
            } else {
                // 已经超过总页数
                this.setState(() => ({
                    loading: false,
                }))
                return;
            }
        }

        let res = await API.DYNAMIC_SEARCH(params)
        if (res) {
            dynamicData = [...dynamicData, ...res.data]
            this.setState(() => ({
                dynamicData,
                page: res.pagination.page,
                page_num: res.pagination.page_num,
                loading: false,
            }))
        }
    }
    UNSAFE_componentWillMount() {
        this.getDynamicData(true)
    }
    dynamic = () => {
        let { userId } = this.props
        let { dynamicData } = this.state
        let noData = <div style={{ backgroundColor: '#fff', textAlign: 'center', height: "634px", lineHeight: '634px' }}>暂无数据</div>

        return <div>
            {!dynamicData.length ? noData :
                dynamicData.map((item, key) =>
                    <Card full key={key} style={{ marginBottom: '15px' }}>
                        <Card.Header
                            title={<div>{item._author.nickname}&nbsp;{item.sex ?
                                <span className="iconfont icon-nan" style={{ color: 'rgb(51, 163, 244)' }} />
                                : <span className="iconfont icon-nv" style={{ color: 'rgb(255, 77, 148)' }} />
                            }</div>}
                            thumb={
                                <div style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '6px', border: '1px solid #d0cece', overflow: 'hidden' }}>
                                    <Link to={{
                                        pathname: `/user/id/${item._id}`,
                                        search: `title=${item._author.nickname}`
                                    }}>
                                        <img style={{ width: '100%', height: '100%' }} src={item._author.head_img_url} alt='' />
                                    </Link>
                                </div>
                            }
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
                                    <span className='iconfont icon-dianzan' /> {item.likes_count || '赞'}
                                </span>
                                {this.props.type ? null : <Link to={'/dynamic/id/' + item._id} style={{ marginLeft: '20px', color: '#888' }}><span className='iconfont icon-weibiaoti527' /> {item.comment_count}</Link>}
                            </div>} />
                    </Card>
                )
            }
        </div>
    }
    render() {
        let { type } = this.props
        let { loading } = this.state

        return (
            <div className="dynamic_list">
                {!type ?
                    <RefreshContainer
                        onRefresh={(isCover) => { this.getDynamicData(isCover) }}
                        loading={loading}
                    >
                        {this.dynamic()}
                    </RefreshContainer>
                    : this.dynamic()
                }
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