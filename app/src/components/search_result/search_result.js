import React, { Component } from 'react';
import DynamicList from '../common/dynamic_list/dynamic_list'

class SearchResult extends Component {
    render() {
        let params = this.props.match.params
        return (
            <div>
                <DynamicList params={params}></DynamicList>
            </div>
        )
    }
}

export default SearchResult