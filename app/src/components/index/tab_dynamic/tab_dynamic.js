import React, { Component } from 'react';
import { connect } from 'dva';
import { Tabs, WhiteSpace } from 'antd-mobile';
import API from '../../../services/index'
import DynamicList from '../../common/dynamic_list/dynamic_list'

class TabDynamic extends Component {
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
    content = item => {
        let { dynamicData, currentCategoryId } = this.state
        return (<div >
            {currentCategoryId !== item._id ? null
                : <DynamicList data={dynamicData} style={{ backgroundColor: '#fff', marginBottom: '12px' }}></DynamicList>
            }
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

export default connect()(TabDynamic);