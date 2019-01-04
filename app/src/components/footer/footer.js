import React, { Component } from 'react';
import { TabBar } from 'antd-mobile';
import { Redirect, withRouter } from 'dva/router';

class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabsData: [{
                icon: { uri: 'https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg' },
                selectedIcon: { uri: 'https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg' },
                title: '首页',
                key: '/',
            }, {
                icon: { uri: 'https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg' },
                selectedIcon: { uri: 'https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg' },
                title: '发表',
                key: '/publish',
            }, {
                icon: { uri: 'https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg' },
                selectedIcon: { uri: 'https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg' },
                title: '消息',
                key: '/news',
            }, {
                icon: { uri: 'https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg' },
                selectedIcon: { uri: 'https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg' },
                title: '我的',
                key: '/user',
            }],
            hidden: false,
            fullScreen: true,
        };
    }

    render() {
        let { tabsData } = this.state
        let { history, location, includesPages } = this.props,
            pathname = location.pathname;
        return (!includesPages.includes(pathname) ? null :
            <div style={this.state.fullScreen ? { position: 'fixed', width: '100%', bottom: 0 } : { height: 400 }}>
                <TabBar
                    unselectedTintColor="#949494"
                    tintColor="#33A3F4"
                    barTintColor="white"
                    hidden={this.state.hidden}
                    noRenderContent={true}
                >
                    {tabsData.map(({ icon, selectedIcon, title, key }) =>
                        <TabBar.Item
                            icon={icon}
                            selectedIcon={selectedIcon}
                            title={title}
                            key={key}
                            selected={pathname === key}
                            onPress={() => { history.push(key) }}
                        >
                        </TabBar.Item>
                    )}
                </TabBar>
            </div>
        );
    }
}


export default withRouter(Footer)

