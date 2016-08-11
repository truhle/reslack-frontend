import React from 'react';
import CSHeader from './CSHeader';
import ChannelsScroller from './ChannelsScroller';

const ChannelSwitcher = React.createClass({
  render() {
    return <div className="channel-switcher">
      <CSHeader group_name={this.props.group_name}
                username={this.props.current_user.username}
                present={this.props.current_user.present}
                toggleTeamMenu={this.props.toggleTeamMenu} />
      <ChannelsScroller current_user={this.props.current_user}
                        all_channels={this.props.all_channels}
                        users={this.props.users}
                        switchChannel={this.props.switchChannel} />
    </div>
  }
});

export default ChannelSwitcher;
