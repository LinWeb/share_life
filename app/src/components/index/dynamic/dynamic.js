import React, { Component } from 'react';
import { connect } from 'dva';
import { Tabs, Card, WhiteSpace, Grid, Button } from 'antd-mobile';
import API from '../../../services/index'
import { getDetailDate } from '../../../utils/filter'
import { Link } from 'dva/router';

class Dynamic extends Component {
    state = {
        categoryData: [],
        dynamicData: [],
        initialPage: 0,
        currentCategoryId: ''
    }
    async getCategory() {
        let res = await API.CATEGORY()
        if (res) {
            let data = res.data.map(({ name, _id }) => {
                return { title: name, _id }
            });
            this.setState(() => ({ categoryData: data }), () => {
                this.changeCurrentCategoryId(data[0]._id)
            })
        }
    }
    async getDynamic() {
        let _category = this.state.currentCategoryId
        let res = await API.DYNAMIC_SEARCH({ _category })
        if (res) {
            this.setState(() => ({
                dynamicData: res.data
            }))
        }
    }
    changeCurrentCategoryId(id) {
        this.setState(() => ({ currentCategoryId: id }), () => {
            this.getDynamic()
        })
    }
    tabOnChange = (tabData, index) => {
        this.changeCurrentCategoryId(tabData._id)
    }
    componentWillMount() {
        this.getCategory()
    }
    follow(id) {
        console.log(id)
    }
    content = item => {
        let { dynamicData, currentCategoryId } = this.state
        let noData = <div style={{ backgroundColor: '#fff', textAlign: 'center', padding: '12px 0' }}>暂无数据</div>
        return (<div >
            {currentCategoryId !== item._id ? null
                : !dynamicData.length ? noData :
                    dynamicData.map((item, key) =>
                        <div key={key} style={{ backgroundColor: '#fff', marginBottom: '12px' }}>
                            <Card full>
                                <Card.Header
                                    title={<div>{item._author.username}</div>}
                                    thumb={<div style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '6px' }}><img style={{ width: '100%', height: '100%' }} src={item._author.head_img_url} /></div>}
                                    extra={<Button type="ghost" inline size="small" style={{ marginRight: '4px' }}
                                        onClick={() => { this.follow(item._author._id) }}>关注</Button>}
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
                                        <span style={{ marginRight: '20px' }}>点赞 {item.likes_count}</span>
                                        <Link to='/hhh' style={{ color: '#888' }}>评论 {item.comment_count}</Link>
                                    </div>} />
                            </Card>
                        </div>
                    )}
        </div>)
    }
    render() {
        let { categoryData, dynamicData, initialPage } = this.state
        return (
            <div>
                <Tabs tabs={categoryData}
                    onChange={this.tabOnChange}
                    initialPage={initialPage}
                    renderTabBar={
                        props =>
                            // <div style={{ position: 'fixed', top: '53px', width: '100%', zIndex: 10 }}>
                            <Tabs.DefaultTabBar {...props} page={4} />
                        // </div>
                    }>
                    {this.content}
                </Tabs>
                <WhiteSpace />
            </div>
        );
    }
}

export default connect()(Dynamic);
