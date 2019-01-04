import React, { Component } from 'react';
import { NavBar, Icon } from 'antd-mobile';
import { withRouter, Link } from 'dva/router';
import routerConfig from '../../../config/router_config'

class Header extends Component {
    render() {
        let { history, location, excludesPages, mainPages } = this.props,
            pathname = location.pathname;
        let target = routerConfig.find(item => item.path === pathname)
        let title = target ? target.title : ''
        return (excludesPages.includes(pathname) ? null :
            <div>
                <NavBar
                    mode="light"
                    icon={mainPages.includes(pathname) ? null : <Icon type="left" />}
                    onLeftClick={() => { history.go(-1) }}
                    rightContent={mainPages.includes(pathname) ? null : [
                        // <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
                        <Link to='/' key="1"><Icon type="ellipsis" /></Link>
                    ]}
                >{title}</NavBar>
            </div>
        )
    }
}

export default withRouter(Header) 