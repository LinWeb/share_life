import React, { Component } from 'react';
import { connect } from 'dva';
// import styles from './index.css';
import Header from '../components/header/header'
import Footer from '../components/footer/footer'


class Index extends Component {
  render() {
    return (
      <div className='app-container'>
        <div className='header-container'>
          <Header></Header>
        </div>
        {this.props.children}
        <div className='footer-container'>
          <Footer></Footer></div>
      </div>
    )
  }
}
export default connect()(Index);
