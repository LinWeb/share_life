import React, { Component } from 'react';
import { NavBar, Icon } from 'antd-mobile';
import { withRouter, Link } from 'dva/router';
import routerConfig from '../../../config/router_config'
import querystring from 'querystring'
class Header extends Component {
    render() {
        let { history, location, excludesPages, mainPages } = this.props,
            pathname = location.pathname;
        let target = routerConfig.find(item => item.path === pathname)
        let title = target ? target.title : ''
        if (title === '') {
            let search = this.props.location.search
            search = querystring.parse(search.substring(1))
            title = search.title
        }
        return (excludesPages.includes(pathname) ? null :
            <div>
                <NavBar
                    mode="light"
                    icon={mainPages.includes(pathname) ? null : <Icon type="left" />}
                    onLeftClick={() => { history.go(-1) }}
                    rightContent={mainPages.includes(pathname) ? null : [
                        <Link to='/' key="1"><span className='iconfont icon-shouye' /></Link>
                    ]}
                >{title}</NavBar>
            </div>
        )
    }
}

export default withRouter(Header) 