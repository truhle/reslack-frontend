import React from 'react';
import ChannelsHeader from './ChannelsHeader';
import ChannelContainer from './ChannelContainer';
import DMContainer from './DMContainer';

const StarredChannelsContainer = React.createClass({
  render() {
    return <div className="channels-container">
      <ChannelsHeader name="starred" />
      <div className="clear"></div>
      <ul>
        {this.props.channels.map ( channel => channel.channel_type == "group" 
          ? <ChannelContainer channel={channel}
                              current_channel_id={this.props.current_channel_id}
                              switchChannel={this.props.switchChannel}
                              key={channel.id} />
          : <DMContainer usernames={channel.usernames}
                         users={this.props.users}
                         current_channel_id={this.props.current_channel_id}
                         channel_id={channel.id}
                         username={this.props.username}
                         switchChannel={this.props.switchChannel}
                         key={channel.id} />
        )}
      </ul>
    </div>
  }
});

export default StarredChannelsContainer;
