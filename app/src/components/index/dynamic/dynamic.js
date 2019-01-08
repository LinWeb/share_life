import React, { Component } from 'react';
import { connect } from 'dva';
import { Tabs, Card, WhiteSpace, Grid, Button } from 'antd-mobile';
import API from '../../../services/index'
import { getDetailDate } from '../../../utils/filter'
import { Link } from 'dva/router';

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
            this.setState(() => ({
                dynamicData: res.data
            }))
        }
    }
    componentWillMount() {
        this.getCategory()
        this.getDynamic()
    }
    follow(id) {
        console.log(id)
    }
    content = item => {
        const data1 = Array.from(new Array(9)).map(() => ({
            icon: 'https://gw.alipayobjects.com/zos/rmsportal/WXoqXTHrSnRcUwEaQgXJ.png',
        }));
        let { dynamicData } = this.state
        return (<div>
            {dynamicData.map((item, key) =>
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
        let { categoryData, dynamicData } = this.state
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
