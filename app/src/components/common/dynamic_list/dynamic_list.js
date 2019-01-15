import React, { Component } from 'react';
import { Card, Grid, Button, ActivityIndicator } from 'antd-mobile';
import { getDetailDate } from '../../../utils/filter'
import { Link } from 'dva/router';
import { connect } from 'dva'
import API from '../../../services/index'
class DynamicList extends Component {
    state = {
        dynamicData: [],
        touchDistance: 0, // 滑动的距离
        initPageY: 0,  // 开始滑动位置的pageY
        maxDistance: 90,  // 上下滑动最大距离
        topLoading: false,// 顶部loading状态
        bottomLoading: false, // 底部loading状态
        page: 0, // 页码
        page_num: 0, // 总页数
    }
    async updateFollow(_id, is_followed) {
        let res = await API.UPDATE_FOLLOW({ _id, is_followed })
        if (res) {
            let dynamicData = this.state.dynamicData.map(item => {
                let { is_followed } = item
                if (item._author._id === _id) {
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
    onTouchStart = (e) => {
        let initPageY = e.targetTouches[0].pageY
        this.setState(() => ({
            initPageY
        }))
    }
    onTouchMove = (e) => {
        let scrollTop = document.querySelector('html').scrollTop
        let scrollHeight = document.querySelector('html').scrollHeight
        let clientHeight = document.querySelector('html').clientHeight
        let pageY = e.targetTouches[0].pageY
        let touchDistance = pageY - this.state.initPageY
        let { maxDistance } = this.state
        if (touchDistance > 0) {
            if (scrollTop === 0 && touchDistance < maxDistance) {
                // 滚动到顶部情况下，下拉刷新
                this.setState(() => ({
                    touchDistance
                }))
            }
        } else {
            if (scrollTop + clientHeight === scrollHeight && touchDistance > -maxDistance) {
                // 滚动到底部情况下，上拉刷新
                this.setState(() => ({
                    touchDistance
                }))
            }
        }
    }
    onTouchEnd = () => {
        let scrollTop = document.querySelector('html').scrollTop
        let scrollHeight = document.querySelector('html').scrollHeight
        let clientHeight = document.querySelector('html').clientHeight
        if (this.state.touchDistance > 0) {
            if (scrollTop === 0) {
                // 滚动到顶部情况下，下拉刷新
                this.setState(() => ({
                    touchDistance: 50,
                    topLoading: true,
                    bottomLoading: false
                }), () => {
                    // 请求第一页的数据
                    this.getDynamicData(true)
                })
            }
        } else {
            if (scrollTop + clientHeight === scrollHeight) {
                // 滚动到底部情况下，上拉刷新
                this.setState(() => ({
                    touchDistance: -10,
                    topLoading: false,
                    bottomLoading: true
                }), () => {
                    // 请求下一页数据
                    this.getDynamicData(false)
                })
            }
        }
    }
    async getDynamicData(init) {
        let { params } = this.props;
        let dynamicData = []

        if (!init) {
            // 请求下一页数据
            let { page, page_num } = this.state
            page += 1;
            if (page <= page_num) {
                params = { ...params, page }
                dynamicData = [...this.state.dynamicData]
            } else {
                // 已经超过总页数
                this.setState(() => ({
                    touchDistance: 0,
                    topLoading: false,
                    bottomLoading: false
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
                touchDistance: 0,
                topLoading: false,
                bottomLoading: false
            }))
        }
    }
    UNSAFE_componentWillMount() {
        this.getDynamicData(true)
    }
    render() {
        let { userId } = this.props
        let noData = <div style={{ backgroundColor: '#fff', textAlign: 'center', height: "634px", lineHeight: '634px' }}>暂无数据</div>
        let { dynamicData, touchDistance, maxDistance, topLoading, bottomLoading } = this.state
        let translateY = `translateY(${touchDistance}px)` // 滑动样式

        // 顶部loading
        let refreshTopTip = <div style={{ height: maxDistance + 'px', lineHeight: maxDistance + 'px', textAlign: 'center', marginTop: '-' + maxDistance + 'px' }}>
            {topLoading ? <ActivityIndicator animating /> : "松开立即刷新"}
        </div>

        // 底部loading
        let refreshBottomTip = <div style={{ textAlign: 'center' }}>
            {bottomLoading ? <ActivityIndicator animating /> : "已加载完"}
        </div>

        return (
            <div className="dynamic_list" style={{ transition: '.3s', transform: translateY }} onTouchStart={this.onTouchStart} onTouchMove={this.onTouchMove} onTouchEnd={this.onTouchEnd}>
                {refreshTopTip}
                {!dynamicData.length ? noData :
                    dynamicData.map((item, key) =>
                        <Card full key={key} style={{ marginBottom: '15px' }}>
                            <Card.Header
                                title={<div>{item._author.username}</div>}
                                thumb={<div style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '6px', border: '1px solid #d0cece', overflow: 'hidden' }}>
                                    <img style={{ width: '100%', height: '100%' }} src={item._author.head_img_url} alt='' /></div>}
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
                {refreshBottomTip}
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