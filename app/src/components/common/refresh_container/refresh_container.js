import React, { Component } from 'react';
import { ActivityIndicator } from 'antd-mobile';

class RefreshContainer extends Component {
    state = {
        touchDistance: 0, // 滑动的距离
        initPageY: 0,  // 开始滑动位置的pageY
        maxDistance: 90,  // 上下滑动最大距离
        topLoading: false,// 顶部loading状态
        bottomLoading: false, // 底部loading状态
        page: 0, // 页码
        page_num: 0, // 总页数
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
        let { disabledTopRefresh, disabledBottomRefresh } = this.props
        if (touchDistance > 0) {
            if (!disabledTopRefresh) {
                if (scrollTop === 0 && touchDistance < maxDistance) {
                    // 滚动到顶部情况下，下拉刷新
                    this.setState(() => ({
                        touchDistance
                    }))
                }
            }
        } else {
            if (!disabledBottomRefresh) {
                if (scrollTop + clientHeight === scrollHeight && touchDistance > -maxDistance) {
                    // 滚动到底部情况下，上拉刷新
                    this.setState(() => ({
                        touchDistance
                    }))
                }
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
                    this.props.onRefresh(true)
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
                    this.props.onRefresh(false)
                })
            }
        }
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (!nextProps.loading) {
            this.setState(() => ({
                touchDistance: 0,
                topLoading: false,
                bottomLoading: false
            }))
        }
    }
    render() {
        let { touchDistance, maxDistance, topLoading, bottomLoading } = this.state

        let translateY = `translateY(${touchDistance}px)` // 滑动样式

        // 顶部loading
        let refreshTopTip = <div style={{ height: maxDistance + 'px', lineHeight: maxDistance + 'px', textAlign: 'center', marginTop: '-' + maxDistance + 'px' }}>
            {topLoading ? <ActivityIndicator animating /> : "松开立即刷新"}
        </div>

        // 底部loading
        let refreshBottomTip = bottomLoading ?
            <div style={{ textAlign: 'center' }}><ActivityIndicator animating /></div>
            : null


        return (
            <div className="refresh_container" style={{ transition: '.3s', transform: translateY }} onTouchStart={this.onTouchStart} onTouchMove={this.onTouchMove} onTouchEnd={this.onTouchEnd}>
                {refreshTopTip}
                {this.props.children}
                {refreshBottomTip}
            </div>
        )
    }

}

export default RefreshContainer