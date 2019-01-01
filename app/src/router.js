import React from 'react';
import { Router, Route, Switch, withRouter } from 'dva/router';
import Index from './components/index/index';
import Publish from './components/publish/publish';
import News from './components/news/news';
import My from './components/my/my';
import Footer from './components/footer/footer'

import Register from './components/register/register'


function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <div className='app-container'>
        <Switch>
          <Route path="/" exact component={Index} />
          <Route path="/register" exact component={Register} />
          <Route path="/publish" exact component={Publish} />
          <Route path="/news" exact component={News} />
          <Route path="/my" exact component={My} />
        </Switch>
        <div className='footer-container'>
          <Footer></Footer>
        </div>
        {/* {withRouter((props) => (
          <div className='footer-container'>
            <Footer {...props}></Footer>
          </div>)
        )} */}
      </div>
    </Router>
  );
}

export default RouterConfig;
