import React from 'react';
import CSHeaderName from './CSHeaderName';
import NotificationsIcon from './NotificationsIcon';
import UserIndicator from './UserIndicator';
import auth from '../modules/auth.js';

const CSHeader = React.createClass({
  contextTypes: {
    router: React.PropTypes.object
  },
  
  handleClick(e) {
    e.preventDefault();
    auth.logout(() => {
      let path = `/${this.props.groupPrefix}/signin`;
      this.context.router.push(path);
    });
  },
  
  render() {
    return <div className="cs-header" onClick={this.handleClick} >
        <CSHeaderName group_name={this.props.group_name} />
        <NotificationsIcon />
        <UserIndicator present={this.props.present} 
                       username={this.props.username} /> 
        <div className="clear"></div>
    </div>
  }
});

export default CSHeader;
