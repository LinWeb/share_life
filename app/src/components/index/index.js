import React, { Component } from 'react';
import { connect } from 'dva';
import Search from './search/search'
import Dynamic from './dynamic/dynamic'

class Index extends Component {
  renderContent = tab =>
    (<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
      <p>Content of {tab.title}</p>
    </div>);

  render() {

    return (
      <div className='index-container'>
        <div className='search-container'>
          <Search></Search>
        </div>
        <div className='dynamic-container'>
          <Dynamic></Dynamic>
        </div>
      </div>
    );
  }
}

export default connect()(Index);
