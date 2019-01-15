import React, { Component } from 'react';
import { connect } from 'dva';
import Search from './search/search'
import TabDynamic from './tab_dynamic/tab_dynamic'

class Index extends Component {
  renderContent = tab =>
    (<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
      <p>Content of {tab.title}</p>
    </div>);

  render() {
    return (
      <div className='index-container' style={{ marginBottom: '45px' }}>
        <div className='search-container' style={{ position: 'fixed', top: '0px', width: '100%', zIndex: 10 }}>
          <Search></Search>
        </div>
        <div className='dynamic-container' style={{ marginTop: '86px' }} >
          <TabDynamic></TabDynamic>
        </div>
      </div>
    );
  }
}

export default connect()(Index);
