import React, { Component } from 'react';
import DynamicList from '../common/dynamic_list/dynamic_list'
import styles from './dynamic_detail.css'
import API from '../../services/index'
import { Button, TextareaItem } from 'antd-mobile'
import { getDetailDate } from '../../utils/filter'
import { createForm } from 'rc-form';
class DynamicDetail extends Component {
    state = {
        dynamicDetailData: {},
        commentData: []
    }
    async getDynamicDetail() {
        let id = this.props.match.params.id;
        let res = await API.DYNAMIC_SEARCH({ id })
        if (res) {
            this.setState(() => ({
                dynamicDetailData: res.data
            }))
        }
    }
    async getCommentData() {
        let _dynamic = this.props.match.params.id;
        let res = await API.GET_COMMENT({ _dynamic })
        if (res) {
            this.setState(() => ({
                commentData: res.data
            }))
        }
    }
    async saveComment() {
        let { form } = this.props,
            { getFieldValue } = form,
            content = getFieldValue('content'),
            _dynamic = this.props.match.params.id;
        let res = await API.ADD_COMMENT({ _dynamic, content })
    }
    async updateLike(_id, is_liked) {
        let res = await API.COMMENT_UPDATE_LIKE({ _id, is_liked })
    }
    componentWillMount() {
        this.getDynamicDetail();
        this.getCommentData()
    }
    render() {
        let { dynamicDetailData, commentData } = this.state
        let { form } = this.props,
            { getFieldProps } = form;
        console.log(commentData)
        return (
            <div>
                <DynamicList data={dynamicDetailData} type={1} />
                <div className={styles.comment_list}>
                    <div className={styles.comment_count}>评价 {commentData.length}</div>
                    {commentData.map((item, key) => (
                        <div className={styles.comment_item} key={key}>
                            <div className={styles.head_img}><img src={item._user.head_img_url} /></div>
                            <div className={styles.comment_main}>
                                <div className={styles.username}>{item._user.username} </div>
                                <div className={styles.content}>{item.content} </div>
                                <div className={styles.create_time}>{getDetailDate(item.create_time)} </div>
                            </div>
                            <div className={styles.like} style={{ color: item.is_liked ? 'rgb(233, 79, 79)' : '' }} onClick={() => { this.updateLike(item._id, !item.is_liked) }}><span className='iconfont icon-dianzan' /> {item.likes_count || '赞'}</div>
                        </div>
                    ))}
                </div>
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