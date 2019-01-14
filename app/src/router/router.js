import React from 'react';
import { Router, Route, Switch, } from 'dva/router';
import Header from '../components/header/header'
import Footer from '../components/footer/footer'
import PrivateRoute from './private_route'
import routerConfig from '../../config/router_config'
import index from '../components/index';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <div className='app-container'>
        <div className='header-container' style={{
          position: "fixed", top: 0, left: 0,
          zIndex: 99,
          right: 0
        }}>
          <Header excludesPages={['/']} mainPages={['/news', '/user']} ></Header>
        </div>
        <div className='content-container' style={{ marginTop: '45px' }}>
          <Switch>
            {routerConfig.map(({ isPrivate, ...res }, key) =>
              isPrivate ?
                <PrivateRoute {...res} key={key} />
                : <Route {...res} key={key} />
            )}
            {/* <Route path='/' exact component={Index} />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <PrivateRoute path="/publish" exact component={Publish} />
          <PrivateRoute path="/news" exact component={News} />
          <PrivateRoute path="/my" exact component={User} /> */}
          </Switch>
        </div>
        <div className='footer-container'>
          <Footer includesPages={['/', '/news', '/user']} ></Footer>
        </div>
      </div>
    </Router>
  );
}


export default RouterConfig;
