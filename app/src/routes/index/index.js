import React from 'react';
import { connect } from 'dva';
import styles from './index.css';

function IndexPage() {
  return (
    <div>
      首页
    </div>
  );
}

export default connect()(IndexPage);
