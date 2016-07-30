import React from 'react';
import { render } from 'react-dom';
import './style.scss';
import App from './components/App';
import SignIn from './components/SignIn';
import GroupView from './components/GroupView';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

render((
  <Router history={ browserHistory }>
    <Route path="/" component={App} >
      <IndexRoute component={SignIn} />
      <Route path="signin" component={SignIn} />
      <Route path="/:groupPrefix/signin" component={SignIn} />
      <Route path="/:groupPrefix" component={GroupView} />
      <Route path="/:groupPrefix/messages/:channelName" component={GroupView} />
    </Route>
  </Router>
), document.getElementById('main'));
