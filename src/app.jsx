import './app.sass';
import './segment';
require('es5-shim');
require('es6-shim');

import React from 'react';
import {render} from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

// Pages
import LandingPage from './pages/landingpage';
import NotFoundPage from './pages/notfound';
// Page components
import Landing from './apps/Landing';

render(
  <Router history={browserHistory}>
    <Route path="/">
      <Route component={LandingPage}>
        <IndexRoute component={Landing}/>
      </Route>
    </Route>
    <Route
      path="*"
      component={NotFoundPage} />
  </Router>,
  document.getElementById('app')
);
