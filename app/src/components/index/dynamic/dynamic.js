import React, { Component } from 'react';
import { connect } from 'dva';
import { Tabs, Card, WhiteSpace, Grid, Button } from 'antd-mobile';
import API from '../../../services/index'

class Dynamic extends Component {
    state = {
        categoryData: [],
        dynamicData: []
    }
    async getCategory() {
        let res = await API.CATEGORY()
        if (res) {
            let data = res.data.map(({ name, _id }) => {
                return { title: name, _id }
            });
            this.setState(() => ({ categoryData: data }))
        }
    }
    async getDynamic() {
        let res = await API.DYNAMIC({})
        if (res) {
            console.log(res)
            this.setState(() => ({
                dynamicData: res.data
            }))
        }
    }
    componentWillMount() {
        this.getCategory()
        this.getDynamic()
    }
    content = item => {
        const data1 = Array.from(new Array(9)).map(() => ({
            icon: 'https://gw.alipayobjects.com/zos/rmsportal/WXoqXTHrSnRcUwEaQgXJ.png',
        }));
        return (<div style={{ backgroundColor: '#fff' }}>
            <WhiteSpace size="lg" />
            <Card full>
                <Card.Header
                    title="小强"
                    thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"
                    extra={<Button type="ghost" inline size="small" style={{ marginRight: '4px' }}>关注</Button>}
                />
                <Card.Body>
                    <div>洒洒水大所大奥奥奥奥奥奥奥奥奥奥硕大的多多多多多多多多多多多多多多多多多多多多多多多多多多多多多</div>
                    <Grid data={data1}
                        columnNum={3}
                        renderItem={dataItem => (
                            <div style={{ padding: '12.5px' }}>
                                <img src={dataItem.icon} style={{ width: '75px', height: '75px' }} alt="" />
                                <div style={{ color: '#888', fontSize: '14px', marginTop: '12px' }}>
                                    <span>I am title..</span>
                                </div>
                            </div>
                        )}
                    />
                </Card.Body>
                <Card.Footer content="点赞" extra={<div>评论</div>} />
            </Card>
        </div>)
    }
    render() {
        let { categoryData, dynamicData } = this.state
        console.log(categoryData, dynamicData)
        return (
            <div>
                <WhiteSpace />
                <Tabs tabs={categoryData} renderTabBar={
                    props => <Tabs.DefaultTabBar {...props} page={4} />
                }>
                    {this.content}
                </Tabs>
                <WhiteSpace />
            </div>
        );
    }
}

export default connect()(Dynamic);
