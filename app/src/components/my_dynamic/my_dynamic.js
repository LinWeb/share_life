import React, { Component } from 'react';
import DynamicList from '../common/dynamic_list/dynamic_list'
import API from '../../services/index'
import { connect } from 'dva'

class MyDynamic extends Component {
    state = {
        dynamicData: []
    }
    async getDynamic() {
        let res = await API.DYNAMIC_SEARCH({ _author: this.props._author })
        console.log(1111, res)

        if (res) {
            this.setState(() => ({
                dynamicData: res.data
            }))
        }
    }
    UNSAFE_componentWillMount() {
        this.getDynamic()
    }
    render() {
        return (
            <div>
                <DynamicList data={this.state.dynamicData}></DynamicList>
            </div>
        )
    }
}

export default connect((state) => {
    return {
        _author: state.user.userId
    }
})(MyDynamic) 