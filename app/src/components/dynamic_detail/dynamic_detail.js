import React, { Component } from 'react';
import DynamicList from '../common/dynamic_list/dynamic_list'
import styles from './dynamic_detail.css'
import API from '../../services/index'
import { Button, TextareaItem } from 'antd-mobile'
import { Link } from 'dva/router'
import { getDetailDate } from '../../utils/filter'
import { createForm } from 'rc-form';
import RefreshContainer from '../common/refresh_container/refresh_container'


class DynamicDetail extends Component {
    state = {
        commentData: [],
        page: 0, // 页码
        page_num: 1, // 总页数
        loading: false,
    }
    async getCommentData() {
        let _dynamic = this.props.match.params.id;
        let params = { _dynamic }
        let commentData = []
        // 请求下一页数据
        let { page, page_num } = this.state
        page += 1;
        if (page > page_num) {
            // 已经超过总页数
            this.setState(() => ({
                loading: false,
            }))
            return;
        }
        this.setState(() => ({
            loading: true,
        }))
        params = { ...params, page }
        commentData = [...this.state.commentData]
        let res = await API.GET_COMMENT(params)
        if (res) {
            commentData = [...commentData, ...res.data]
            this.setState(() => ({
                commentData,
                page: res.pagination.page,
                page_num: res.pagination.page_num,
                loading: false,
            }))
        }
    }
    async saveComment() {
        let { form } = this.props,
            { getFieldValue, resetFields } = form,
            content = getFieldValue('content'),
            _dynamic = this.props.match.params.id;
        let res = await API.ADD_COMMENT({ _dynamic, content })
        if (res) {
            resetFields(['content']) // 重置数据
            this.setState(() => ({
                commentData: [res.data, ...this.state.commentData]
            }))
        }
    }
    async updateLike(_id, is_liked) {
        let res = await API.COMMENT_UPDATE_LIKE({ _id, is_liked })
        if (res) {
            let count = res.data.count;
            let commentData = this.state.commentData.map(item => {
                let likes_count = item.likes_count
                let is_liked = item.is_liked
                if (item._id === _id) {
                    likes_count = count
                    is_liked = !is_liked
                }
                return { ...item, likes_count, is_liked }
            })
            this.setState((preState) => ({
                commentData
            }))
        }
    }
    UNSAFE_componentWillMount() {
        this.getCommentData();
    }
    render() {
        let { commentData } = this.state
        let { form, match } = this.props,
            { getFieldProps } = form;
        let params = {
            id: match.params.id
        }
        return (
            <div style={{ marginBottom: '45px' }}>
                <RefreshContainer onRefresh={() => { this.getCommentData() }} disabledTopRefresh>
                    <DynamicList params={params} type={1}></DynamicList>
                    <div className={styles.comment_list}>
                        <div className={styles.comment_count}>评价 {commentData.length}</div>
                        {commentData.map((item, key) => (
                            <div className={styles.comment_item} key={key}>
                                <div className={styles.head_img}>
                                    <Link to={{
                                        pathname: `/user/id/${item._user._id}`,
                                        search: `title=${item._user.nickname}的主页`
                                    }}>
                                        <img src={item._user.head_img_url} alt='' />
                                    </Link>
                                </div>
                                <div className={styles.comment_main}>
                                    <Link to={{
                                        pathname: `/user/id/${item._user._id}`,
                                        search: `title=${item._user.nickname}的主页`
                                    }} className={styles.username}>
                                        {item._user.nickname}
                                    </Link>
                                    <div className={styles.content}>{item.content} </div>
                                    <div className={styles.create_time}>{getDetailDate(item.create_time)} </div>
                                </div>
                                <div className={styles.like} style={{ color: item.is_liked ? 'rgb(233, 79, 79)' : '' }} onClick={() => { this.updateLike(item._id, !item.is_liked) }}><span className='iconfont icon-dianzan' /> {item.likes_count || '赞'}</div>
                            </div>
                        ))}
                    </div>
                </RefreshContainer>
                <div className={styles.comment}>
                    <div style={{ position: "relative" }}>
                        <TextareaItem
                            {...getFieldProps('content')}
                            autoHeight
                            placeholder="请发表您的评价"
                            className={styles.input}
                        />
                        <Button type="primary" inline className={styles.submit} onClick={() => { this.saveComment() }}>发表</Button>
                    </div>
                </div>
            </div>

        )
    }
}

export default createForm()(DynamicDetail) 