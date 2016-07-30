import React from 'react';
import { render } from 'react-dom';
import './style.scss';
import App from './components/App';
import SignUp from './components/SignUp';
import GroupSignIn from './components/GroupSignIn';
import UserSignIn from './components/UserSignIn';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

render((
  <Router history={ browserHistory }>
    <Route path="/" component={SignUp} >
      <IndexRoute component={GroupSignIn} />
      <Route path="/:groupPrefix/signin" component={UserSignIn} />
    </Route>
    <Route path="/:groupPrefix" component={App} />
    <Route path="/:groupPrefix/messages/:channelName" component={App} />
  </Router>
), document.getElementById('main'));
