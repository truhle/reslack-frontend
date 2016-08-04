import React from 'react';
import { render } from 'react-dom';
import './style.scss';
import App from './components/App';
import SignIn from './components/SignIn';
import GroupView from './components/GroupView';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import auth from './modules/auth.js';

function requireAuth(nextState, replace) {
  if (!auth.loggedIn()) {
    replace({
      pathname: `/${localStorage.group_prefix}/signin`,
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

render((
  <Router history={ browserHistory }>
    <Route path="/" component={App} >
      <IndexRoute component={SignIn} />
      <Route path="signin" component={SignIn} />
      <Route path="/:groupPrefix/signin" component={SignIn} />
      <Route path="/:groupPrefix" component={GroupView} onEnter={requireAuth} />
      <Route path="/:groupPrefix/messages/:channelName" component={GroupView} onEnter={requireAuth} />
    </Route>
  </Router>
), document.getElementById('main'));
