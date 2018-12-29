import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import Index from './routes/index/index';


function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={Index} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
