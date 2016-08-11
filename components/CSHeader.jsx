import React from 'react';
import CSHeaderName from './CSHeaderName';
import NotificationsIcon from './NotificationsIcon';
import UserIndicator from './UserIndicator';

const CSHeader = React.createClass({
  render() {
    return <div className="cs-header" onClick={this.props.toggleTeamMenu} >
        <CSHeaderName group_name={this.props.group_name} />
        <NotificationsIcon />
        <UserIndicator present={this.props.present} 
                       username={this.props.username} /> 
        <div className="clear"></div>
    </div>
  }
});

export default CSHeader;
