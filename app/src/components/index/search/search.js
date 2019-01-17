import React, { Component } from 'react';
import { SearchBar, WhiteSpace, } from 'antd-mobile';
import { withRouter } from 'dva/router'
class Header extends Component {
    searchSubmit(val) {
        let { history } = this.props
        history.push({
            pathname: `/dynamic/search/${val}`,
            search: `title="${val}"的搜索结果`
        })
    }
    render() {
        return (
            <div>
                <SearchBar placeholder="搜索" maxLength={8}
                    onSubmit={(val) => { this.searchSubmit(val) }} />
                <WhiteSpace />
            </div>
        )
    }
}

export default withRouter(Header)