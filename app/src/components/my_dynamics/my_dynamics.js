import React, { Component } from 'react';
import DynamicList from '../common/dynamic_list/dynamic_list'
import { connect } from 'dva'

class MyDynamic extends Component {
    render() {
        let { _author, match } = this.props
        let params = {
            _author: match.params.id || _author
        }
        return (
            <div>
                <DynamicList params={params}></DynamicList>
            </div>
        )
    }
}

export default connect((state) => {
    return {
        _author: state.user.userId
    }
})(MyDynamic) 