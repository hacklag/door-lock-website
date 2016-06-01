import './app.sass';

import React from 'react';
import {render} from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

// Pages
import LandingPage from './pages/landingpage';
// Page components
import Landing from './apps/Landing';

render(
  <Router history={browserHistory}>
    <Route path="/">
      <Route component={LandingPage}>
        <IndexRoute component={Landing}/>
      </Route>
    </Route>
  </Router>,
  document.getElementById('app')
);
