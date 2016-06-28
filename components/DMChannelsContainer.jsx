import React from 'react';
import ChannelsHeader from './ChannelsHeader';
import DMContainer from './DMContainer';

const DMChannelsContainer = React.createClass({
  render() {
    return <div className="channels-container">
      <ChannelsHeader name="direct messages"
                      count={this.props.users.length} />
      <div className="clear"></div>
      <ul>
        {this.props.direct_channels.map( direct_channel =>
          <DMContainer channel_id={direct_channel.id}
                       usernames={direct_channel.usernames}
                       users={this.props.users}
                       current_channel_id={this.props.current_channel_id}
                       username={this.props.username}
                       switchChannel={this.props.switchChannel}
                       key={direct_channel.id} />
        )}
      </ul>
    </div>
  }
});

export default DMChannelsContainer;
