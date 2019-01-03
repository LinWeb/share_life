import React, { Component } from 'react';
import { NavBar, Icon } from 'antd-mobile';
import { withRouter } from 'dva/router';

class Header extends Component {

    render() {
        let { history } = this.props
        return (
            <div>
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => { history.go(-1) }}
                    rightContent={[
                        // <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
                        <Icon key="1" type="ellipsis" onClick={() => { history.push('/') }} />,
                    ]}
                >NavBar</NavBar>
            </div>
        )
    }
}

export default withRouter(Header) 