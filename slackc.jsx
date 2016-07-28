import React from 'react';
import { render } from 'react-dom';
import './style.scss';
import App from './components/App';
import SignUp from './components/SignUp';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

render((
  <Router history={ browserHistory }>
    <Route path="/" component={SignUp} />
    <Route path="/signup" component={SignUp} />
    <Route path="/:groupPrefix" component={App} />
    <Route path="/:groupPrefix/messages/:channelName" component={App} />
  </Router>
), document.getElementById('main'));
