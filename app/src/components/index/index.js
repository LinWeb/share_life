import React, { Component } from 'react';
import { connect } from 'dva';
import { Tabs, WhiteSpace } from 'antd-mobile';
import Search from './search/search'
import Dynamic from './dynamic/dynamic'

class Index extends Component {
  renderContent = tab =>
    (<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
      <p>Content of {tab.title}</p>
    </div>);

  render() {
    const tabs = [
      { title: '1st Tab' },
      { title: '2nd Tab' },
      { title: '3rd Tab' },
      { title: '4th Tab' },
      { title: '5th Tab' },
      { title: '6th Tab' },
      { title: '7th Tab' },
      { title: '8th Tab' },
      { title: '9th Tab' },
    ];

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
