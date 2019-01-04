import React from 'react';
import { Router, Route, Switch, withRouter } from 'dva/router';
import Header from '../components/header/header'
import Footer from '../components/footer/footer'
import PrivateRoute from './private_route'
import routerConfig from '../../config/router_config'

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <div className='app-container'>
        <div className='header-container'>
          <Header excludesPages={['/']} mainPages={['/news', '/user']} ></Header>
        </div>
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
        <div className='footer-container'>
          <Footer includesPages={['/', '/news', '/user']} ></Footer>
        </div>
      </div>
    </Router>
  );
}


export default RouterConfig;
